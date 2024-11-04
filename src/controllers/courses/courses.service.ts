import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
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
        entity.instructor = {
            connect: { id: entity.instructorId }
        }
        delete entity.instructorId;
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

        // to-do
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
        var enrollment = new EnrollmentEntity();
        enrollment.studentId = studentInfo.id;
        enrollment.courseId = courseId;
        enrollment.semesterId = semesterId;
        enrollment.enrollmentStatus = 'In Progress';
        enrollment.completionDate = today;
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
    

}
