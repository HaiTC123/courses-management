import { BadRequestException, ForbiddenException, HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { AdvisingStatus, ExamStatus, Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { NotificationType } from 'src/common/const/notification.type';
import { CoreService } from 'src/core/core.service';
import { QuestionDto, QuestionStudentDto } from 'src/model/dto/question.dto';
import { ExamEntity } from 'src/model/entity/exam.entity';
import { QuestionEntity } from 'src/model/entity/question.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class ExamService extends BaseService<ExamEntity, Prisma.ExamCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: ExamEntity): Promise<number> {
        entity.status = ExamStatus.DRAFT;
        const id = await super.add(entity);
        return id;
    }

    async publishExam(examId: number) {
        const exam = await this.prismaService.exam.update({
            where: { id: examId },
            data: { status: 'PUBLISHED' },
            include: { course: true }
        });

        // Gửi thông báo đến sinh viên đã đăng ký khóa học
        const students = await this.prismaService.enrollment.findMany({
            where: { courseId: exam.courseId },
            include: { student: { include: { user: true } } },
        });

        for (const enrollment of students) {
            const { user } = enrollment.student;
            await this.pushNotification(
                user.id, NotificationType.Instructor_Publish_Exam,
                JSON.stringify({
                    courseId: exam.courseId,
                    courseName: exam.course.courseName

                }), this._authService.getFullname(), this._authService.getUserID());
        }

        return exam;
    }

    // Lấy chi tiết đề thi cho sinh viên (nếu đủ điều kiện)
    async getExamDetailsForStudent(examId: number) {

        const exam = await this.prismaService.exam.findUnique({
            where: { id: examId },
            include: { course: true, questions: true },
        });

        if (!exam) {
            throw new BadRequestException('Đề thi không tồn tại');
        }

        const studentId = this._authService.getStudentID();
        // Kiểm tra sinh viên đã đăng ký khóa học hay chưa
        await this.checkStudentEnrollment(studentId, exam.courseId);

        if (exam.questions) {
            exam.questions = this._mapperService.mapListData(exam.questions, QuestionEntity, QuestionStudentDto)
        }
        return exam;
    }

    // Nộp bài thi
    async submitExam(examId: number, answers: Record<number, string>) {
        const studentId = this._authService.getStudentID();
        const exam = await this.prismaService.exam.findUnique({
            where: { id: examId },
            include: { questions: true, course: true },
        });

        if (!exam) {
            throw new BadRequestException('Đề thi không tồn tại');
        }

        const now = new Date();
        if (now > exam.endTime) {
            throw new ForbiddenException('Đề thi đã kết thúc');
        }

        await this.checkStudentEnrollment(studentId, exam.courseId);
        const attempts = await this.prismaService.examResult.count({
            where: { examId, studentId },
        });

        if (attempts >= (exam.maxAttempts || Infinity)) {
            throw new ForbiddenException('Đã vượt quá số lần làm bài cho phép');
        }

        const totalQuestions = exam.questions.length;
        let correctAnswers = 0;

        const result = exam.questions.map((question) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) {
                correctAnswers++;
            }
            return {
                questionId: question.id,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
                content: question.content,
                options: question.options,
                orderNo: question.orderNo
            };
        });

        const score = (correctAnswers / totalQuestions) * 100;
        const isPassed = score >= exam.passingScore;

        const examResult = await this.prismaService.examResult.create({
            data: {
                examId,
                studentId,
                score: Math.round(score),
                correctAnswers,
                incorrectAnswers: totalQuestions - correctAnswers,
                attemptNumber: attempts + 1,
                isPassed,
                completedAt: now,
                result: result
            },
        });

        if (isPassed) {
            await this.processFinalResults(exam.course.id);
            const enrollment = await this.prismaService.enrollment.findFirst({
                where: {
                    studentId,
                    courseId: exam.courseId,
                },
            });
            await this.prismaService.enrollment.update({
                where: {
                    id: enrollment.id
                },
                data: {
                    enrollmentStatus: "Done"
                }
            });
            // await this.prismaService.certificate.create({
            //     data: {
            //         studentId,
            //         courseId: exam.courseId,
            //     },
            // });
        }

        return examResult;
    }


    async getExamResultForStudent(examId: number, studentId: number) {
        const result = await this.prismaService.examResult.findMany({
            where: { examId, studentId },
        });

        if (!result) {
            throw new BadRequestException('Không tìm thấy kết quả cho bài thi này');
        }

        return result;
    }

    // Kiểm tra sinh viên có đăng ký khóa học hay không
    private async checkStudentEnrollment(studentId: number, courseId: number) {
        const enrollment = await this.prismaService.enrollment.findFirst({
            where: {
                studentId,
                courseId
            },
        });

        if (!enrollment) {
            throw new ForbiddenException('Bạn không có quyền truy cập đề thi này');
        }
    }

    async processFinalResults(courseId: number) {
        // Lấy danh sách tất cả các sinh viên đã đăng ký khóa học
        const enrollments = await this.prismaService.enrollment.findMany({
            where: { 
                courseId
            },
            include: { student: true, course: true },
        });

        for (const enrollment of enrollments) {
            const studentId = enrollment.studentId;

            // Lấy tất cả các bài thi của khóa học
            const exams = await this.prismaService.exam.findMany({
                where: { courseId },
                include: {
                    examResults: {
                        where: { studentId },
                    },
                },
            });

            // Tính tổng điểm dựa trên hệ số
            let totalScore = 0;
            let totalCoefficient = 0;

            for (const exam of exams) {
                const highestResult = exam.examResults.reduce((max, result) =>
                    result.score > max ? result.score : max, 0);

                totalScore += highestResult * exam.coefficient;
                totalCoefficient += exam.coefficient;
            }

            // Tính điểm trung bình cuối cùng
            const finalGrade = totalCoefficient > 0 ? totalScore / totalCoefficient : 0;

            if (finalGrade >= enrollment.course.score) {
                // Sinh viên đỗ -> Thêm vào bảng CourseCompletion
                await this.prismaService.courseCompletion.create({
                    data: {
                        studentId,
                        courseId,
                        enrollmentId: enrollment.id,
                        finalGrade,
                        createdBy: 'system',
                        updatedBy: 'system',
                    },
                });
            } else {
                // Sinh viên không đỗ -> Thêm vào bảng FailedCourse
                await this.prismaService.failedCourse.create({
                    data: {
                        studentId,
                        courseId,
                        enrollmentId: enrollment.id,
                        failureReason: 'Không vượt qua kỳ thi',
                        failedDate: new Date(),
                        createdBy: 'system',
                        updatedBy: 'system',
                    },
                });
            }
        }

        return { message: 'Final results processed successfully' };
    }


}
