import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CourseLessonEntity } from 'src/model/entity/course.entity';
import { CourseLessonsService } from './courseLessons.service';
import { CourseLessonDto } from 'src/model/dto/course.dto';


@ApiTags('CourseLessons')
@Controller('api/courseLessons')
@UseGuards(AuthGuard)
export class CourseLessonsController extends BaseController<CourseLessonEntity, Prisma.CourseLessonCreateInput> {
    @EntityType(CourseLessonEntity)
    entity: CourseLessonEntity;

    @ModelType(CourseLessonDto)
    model: CourseLessonDto;
    constructor(private service: CourseLessonsService, coreSevice: CoreService) {
        super("courseLessons", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CourseLessonDto })
    async apiTest(@Body() param: CourseLessonDto) {
        return null;
    }

}
