import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CourseStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CourseEntity } from 'src/model/entity/course.entity';
import { CoursesService } from './courses.service';
import { CourseDto } from 'src/model/dto/course.dto';
import { ServiceResponse } from 'src/model/response/service.response';
import { RolesGuard } from 'src/core/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { BuyCourse, RegisterCourse } from 'src/model/request/registerCourse.request';


@ApiTags('Courses')
@Controller('api/course')
@UseGuards(AuthGuard, RolesGuard)
export class CoursesController extends BaseController<CourseEntity, Prisma.CourseCreateInput> {
    @EntityType(CourseEntity)
    entity: CourseEntity;

    @ModelType(CourseDto)
    model: CourseDto;
    constructor(private service: CoursesService, coreSevice: CoreService) {
        super("courses", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CourseDto })
    async apiTest(@Body() param: CourseDto) {
        return null;
    }

    @Get("detail/:courseId")
    async getDetailCourse(@Param('courseId') courseId: number): Promise<ServiceResponse> {
        return ServiceResponse.onSuccess(await this.service.getCourseWithDetails(courseId));
    }

    @Roles(Role.Instructor)
    @Put("sendToAdmin/:courseId")
    async sentToAdminApprove(@Param("courseId") courseId: number): Promise<ServiceResponse> {
        return this.service.sendCourseToAdminApprove(courseId);
    }

    @Roles(Role.Admin)
    @Put("updateStatus/:courseId")
    async adminUpdateStatus(@Param("courseId") courseId: number
        , @Body('status') status: CourseStatus
    ): Promise<ServiceResponse> {
        if (!Object.values(CourseStatus).includes(status)) {
            return ServiceResponse.onBadRequest(null, 'Invalid course status');
        }
        return await this.service.adminUpdateStatusCourse(courseId, status)
        
    }

    @Roles(Role.Student)
    @Post("register")
    @ApiBody({ type: RegisterCourse })
    async registerCourse(@Body() param: RegisterCourse): Promise<ServiceResponse> {
        return await this.service.registerCourseFree(param.courseId);
    }

    @Roles(Role.Student)
    @Post("buyCourse")
    @ApiBody({ type: BuyCourse })
    async buyCourse(@Body() param: BuyCourse): Promise<ServiceResponse> {
        return await this.service.buyCourse(param.courseId);
    }

    @Get('eligible-courses')
    async getEligibleCourses(
        @Query('courseIds') courseIds: string
    ) {
        const courseIdsArray = courseIds ? courseIds.split(';').map(Number) : [];
        const eligibleCourses = await this.service.getEligibleCoursesForLearningPath(courseIdsArray);
        return ServiceResponse.onSuccess(eligibleCourses);
    }

    @Get('student/:studentId')
    async getCourseByStudentId(@Param('studentId') studentId: number){
        return ServiceResponse.onSuccess(await this.service.getCoursesByStudentId(studentId));
    }

    @Get('student/performance/:courseId')
    async getPerformanceStudent(@Param('courseId') courseId: number){
        return ServiceResponse.onSuccess(await this.service.getStudentPerformance(courseId));
    }

    @Get('instructor/revenue/:instructorId/:courseId')
    async getReviewnue(@Param('instructorId')instructorId: number, @Param('courseId') courseId: number){
        return ServiceResponse.onSuccess(await this.service.getPaidCoursesRevenue(instructorId,courseId));
    }

}
