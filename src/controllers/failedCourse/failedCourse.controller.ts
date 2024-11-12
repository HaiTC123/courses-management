import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { FailedCoursesService } from './failedCourse.service';
import { CourseMaterialDto } from 'src/model/dto/course.dto';
import { FailedCourseEntity, GradeEntity } from 'src/model/entity/grade.entity';
import { FailedCourseDto, GradeDto } from 'src/model/dto/grade.dto';


@ApiTags('FailedCourses')
@Controller('api/failedCourse')
@UseGuards(AuthGuard)
export class FailedCoursesController extends BaseController<FailedCourseEntity, Prisma.FailedCourseCreateInput> {
    @EntityType(FailedCourseEntity)
    entity: FailedCourseEntity;

    @ModelType(FailedCourseDto)
    model: FailedCourseDto;
    constructor(private service: FailedCoursesService, coreSevice: CoreService) {
        super("failedCourses", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: FailedCourseDto })
    async apiTest(@Body() param: FailedCourseDto) {
        return null;
    }

}
