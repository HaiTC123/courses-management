import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
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
    async getDetailCourse(@Param('courseId') courseId: number): Promise<ServiceResponse>{
        return ServiceResponse.onSuccess(await this.service.getCourseWithDetails(courseId));
    }

    @Roles(Role.Instructor)
    @Put("sentToAdmin/:courseId")
    async sentToAdminApprove(@Param("courseId") courseId: number): Promise<ServiceResponse>{
        // to-do
        return null;
    }

    @Roles(Role.Admin)
    @Put("updateStatus/:courseId")
    async adminUpdateStatus(@Param("courseId") courseId: number): Promise<ServiceResponse>{
        // to-do
        return null;
    }

}
