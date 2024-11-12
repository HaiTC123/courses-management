import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { CourseStatus, Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { NotificationType } from 'src/common/const/notification.type';
import { CoreService } from 'src/core/core.service';
import { CourseEntity } from 'src/model/entity/course.entity';
import { EnrollmentEntity } from 'src/model/entity/enrollment.entity';
import { ServiceResponse } from 'src/model/response/service.response';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CoursesService extends BaseService<CourseEntity, Prisma.CourseCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)

    }

    async add(entity: CourseEntity): Promise<number> {
        if (!entity?.instructorId) {
            throw new HttpException({ message: 'InstructorID is null' }, HttpStatus.BAD_REQUEST);
        }
        // entity.instructor = {
        //     connect: { id: entity.instructorId }
        // }
        // delete entity.instructorId;
        return await super.add(entity);
    }

    async getCourseWithDetails(courseId: number) {
        const course = await this.prismaService.course.findUnique({
            where: { id: courseId },
            include: {
                chapters: {
                    include: {
                        lessons: {
                            include: {
                                materials: true, // Lấy tất cả các materials liên quan
                            },
                        },
                    },
                },
            },
        });

        return course;
    }

    async registerCourseFree(courseId: number, semesterId: number): Promise<ServiceResponse> {
        // check couse exist
        var course = await super.getOne({
            id: courseId
        });
        if (!course) {
            return ServiceResponse.onBadRequest(null, "Khóa học không tồn tại");
        }

        // Kiểm tra học kỳ hiện tại có hợp lệ
        const semester = await this.prismaService.semester.findUnique({
            where: { id: semesterId }
        });

        const today = new Date();
        if (!semester || today < semester.startDate || today > semester.endDate) {
            return ServiceResponse.onBadRequest(null, "Thời gian đăng ký đã hết.")
        }
        var studentInfo = await this.prismaService.userRepo.getStudentByUserId(this._authService.getUserID());
        if (!studentInfo) {
            throw new HttpException('Thông tin học sinh không tồn tại.', HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra điều kiện tiên quyết (nếu có)
        const prerequisites = await this.prismaService.prerequisite.findMany({
            where: { courseId: courseId },
            select: { prerequisiteCourseId: true }
        });

        for (const prerequisite of prerequisites) {
            const completion = await this.prismaService.courseCompletion.findFirst({
                where: {
                    studentId: studentInfo.id,
                    courseId: prerequisite.prerequisiteCourseId
                }
            });
            if (!completion) {
                throw new HttpException(
                    `Chưa hoàn thành khóa học tiên quyết: ${prerequisite.prerequisiteCourseId}`,
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        // Kiểm tra trạng thái đăng ký
        const existingEnrollment = await this.prismaService.enrollment.findFirst({
            where: {
                studentId: studentInfo.id,
                courseId: courseId,
                semesterId: semesterId
            }
        });
        if (existingEnrollment) {
            throw new HttpException('Bạn đã đăng ký khóa học này.', HttpStatus.BAD_REQUEST);
        }
        var enrollment = {
            studentId: studentInfo.id,
            courseId: courseId,
            semesterId: semesterId,
            enrollmentStatus: 'In Progress',
            completionDate: today,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Thực hiện đăng ký khóa học
        const enrollment1 = await this.prismaService.enrollment.create({
            data: enrollment
        });

        return ServiceResponse.onSuccess(enrollment1, "Bạn đã đăng ký khóa học thành công");
    }

    async getOne(conditions: { [key: string]: any }): Promise<CourseEntity> {
        const data = await this.repository.findOneWithCondition(conditions);
        this.afterGetData(data);
        return data;
    }
    async getEligibleCoursesForLearningPath(courseIds: number[]) {
        // Bước 1: Lấy danh sách tất cả các khóa học và khóa học tiên quyết
        const allCourses = await this.prismaService.course.findMany();
        const prerequisiteCourses = await this.prismaService.prerequisite.findMany({
            select: {
                courseId: true,
                prerequisiteCourseId: true,
            },
        });

        // Bước 2: Tạo tập hợp các khóa học không thỏa mãn điều kiện tiên quyết
        const prerequisitesMap = new Map<number, Set<number>>();

        for (const prerequisite of prerequisiteCourses) {
            if (!prerequisitesMap.has(prerequisite.courseId)) {
                prerequisitesMap.set(prerequisite.courseId, new Set());
            }
            prerequisitesMap.get(prerequisite.courseId).add(prerequisite.prerequisiteCourseId);
        }

        const ineligibleCourses = new Set<number>();

        for (const courseId of courseIds) {
            if (prerequisitesMap.has(courseId)) {
                for (const prerequisiteId of prerequisitesMap.get(courseId)) {
                    ineligibleCourses.add(prerequisiteId);
                }
            }
        }

        // Bước 3: Lọc các khóa học để trả về các khóa học hợp lệ và loại bỏ các khóa học trong courseIds
        const eligibleCourses = allCourses.filter((course) =>
            !ineligibleCourses.has(course.id) && !courseIds.includes(course.id)
        );
        return eligibleCourses;
    }

    async sendCourseToAdminApprove(courseId: number) {
        var course = await this.getById(courseId);
        if (!course) {
            return ServiceResponse.onBadRequest(null, "Khóa học không tồn tại");
        }

        if (course.status != CourseStatus.DRAFT) {
            return ServiceResponse.onBadRequest(null, "Trạng thái khóa học không hợp lệ");
        }
        // Update status pending
        await this.update(courseId, {
            status: CourseStatus.PENDING_APPROVAL
        });

        // Send notification to admin
        await this.pushNotificationToAdmin(NotificationType.Instructor_Send_Course_To_Admin_Approve,
            JSON.stringify({
                courseId,
                courseName: course.courseName
            }),
            this._authService.getFullname(), this._authService.getUserID()

        )
        return ServiceResponse.onSuccess(null, "send to admin success");
    }

    async adminUpdateStatusCourse(courseId: number, status: CourseStatus) {
        // Tìm kiếm và cập nhật trạng thái của course
        const course = await this.getById(courseId);
        if (!course) {
            return ServiceResponse.onBadRequest(null, 'Course not found');
        }

        // Cập nhật trạng thái khóa học
        course.status = status;
        await this.update(courseId, { status });
        let type = NotificationType.Admin_Reject_Course
        if (status == CourseStatus.APPROVED) {
            type = NotificationType.Admin_Reject_Course;
        }

        var instructor = await this.prismaService.instructor.findUnique({
            where: { id: course.instructorId }
        })
        // Send notification to admin
        await this.pushNotification(instructor.userId, type,
            JSON.stringify({
                courseId,
                courseName: course.courseName
            }),
            this._authService.getFullname(), this._authService.getUserID()

        )
        return ServiceResponse.onSuccess(null, 'Course status updated successfully');
    }

}
