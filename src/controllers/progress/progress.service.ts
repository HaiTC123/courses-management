import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, ProgressStatus } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { ProgressEntity } from 'src/model/entity/progress.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class ProgressService extends BaseService<ProgressEntity, Prisma.ProgressCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async addLessonProgressForStudent(enrollmentId: number, courseId: number) {
        // courseId là tham số đầu vào
        const courseLessons = await this.prismaService.courseLesson.findMany({
            where: {
                chapter: {
                    courseId: courseId, // liên kết thông qua CourseChapter
                },
            },
            select: {
                id: true,
            },
        });

        const lessonIds = courseLessons.map(lesson => lesson.id);

        for (const lessonId of lessonIds) {
            await this.prismaService.progress.create({
                data: {
                    enrollmentId: enrollmentId,
                    lessonId,
                    status: ProgressStatus.NotStarted,
                    courseId
                },
            });
        }
    }

    async addProgressWhenAddLessonForStudents(courseId: number, lessonId: number) {
        const enrollments = await this.prismaService.enrollment.findMany({
            where: {
                courseId,
                semesterId: 2 // to-do
            }
        });

        for (const enroll of enrollments) {
            await this.prismaService.progress.create({
                data: {
                    enrollmentId: enroll.id,
                    lessonId,
                    status: ProgressStatus.NotStarted,
                    courseId
                },
            });
        }
    }

    async doneProgress(lessonId: number) {
        const course = await this.prismaService.courseLesson.findUnique({
            where: {
                id: lessonId, // tìm kiếm theo lessonId
            },
            select: {
                chapter: {
                    select: {
                        courseId: true, // lấy courseId từ chapter
                    },
                },
            },
        });

        const courseId = course?.chapter?.courseId;
        if (!courseId) {
            return false;
        }

        const enrollment = await this.prismaService.enrollment.findFirst({
            where: {
                courseId: courseId,       // ID của khóa học
                studentId: this._authService.getStudentID(),     // ID của sinh viên
                semesterId: 2    // ID của học kỳ to-do
            },
            select: {
                id: true,                 // Chỉ lấy ra `id` của bảng Enrollment
            },
        });

        const enrollmentId = enrollment?.id;

        await this.prismaService.progress.updateMany({
            where: {
                enrollmentId: enrollmentId,
                lessonId: lessonId
            },
            data: {
                status: ProgressStatus.Completed,
                completionDate: new Date()
            }
        })
        return true;

    }

    // async updateLessonProgressForStudents(courseId: number, lessonId: number) {
    //     // Code to update progress for each student's lesson, if needed
    // }


    async removeLessonProgressForStudents(lessonId: number) {
        await this.prismaService.progress.deleteMany({
            where: { lessonId },
        });
    }

    async removeLessonProgressForStudentsMany(lessonIds: number[]) {
        await this.prismaService.progress.deleteMany({
            where: {
                lessonId: {
                    in: lessonIds
                }
            }
        });
    }

    async getCourseProgress(courseId: number) {
        // Bước 1: Lấy tổng số bài học trong khóa học
        const totalLessons = await this.prismaService.courseLesson.count({
          where: { chapter: { courseId } },
        });
    
        // Bước 2: Lấy số bài học đã hoàn thành của người dùng trong khóa học
        const completedLessons = await this.prismaService.progress.count({
            where: {
                enrollment: { 
                    studentId: this._authService.getStudentID(), 
                    courseId ,
                    semesterId: 2 // to-do
                },
                status: ProgressStatus.Completed,
              },
        });
    
        // Bước 3: Trả về tiến trình dưới dạng số bài đã học / tổng số bài học
        return {
          completed: completedLessons,
          total: totalLessons,
        };
      }
}
