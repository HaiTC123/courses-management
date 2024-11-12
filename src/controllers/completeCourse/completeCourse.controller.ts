import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CourseCompletionEntity } from 'src/model/entity/course-complete.entity';
import { CompleteCoursesService } from './completeCourse.service';
import { CourseCompletionDto } from 'src/model/dto/course-complete.dto';


@ApiTags('CompleteCourses')
@Controller('api/completeCourse')
@UseGuards(AuthGuard)
export class CompleteCoursesController extends BaseController<CourseCompletionEntity, Prisma.CourseCompletionCreateInput> {
    @EntityType(CourseCompletionEntity)
    entity: CourseCompletionEntity;

    @ModelType(CourseCompletionDto)
    model: CourseCompletionDto;
    constructor(private service: CompleteCoursesService, coreSevice: CoreService) {
        super("courseCompletetion", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CourseCompletionDto })
    async apiTest(@Body() param: CourseCompletionDto) {
        return null;
    }

}
