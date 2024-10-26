import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CourseChapterEntity } from 'src/model/entity/course.entity';
import { CourseChaptersService } from './courseChapters.service';
import { CourseChapterDto } from 'src/model/dto/course.dto';


@ApiTags('CourseChapters')
@Controller('api/courseChapters')
@UseGuards(AuthGuard)
export class CourseChaptersController extends BaseController<CourseChapterEntity, Prisma.CourseChapterCreateInput> {
    @EntityType(CourseChapterEntity)
    entity: CourseChapterEntity;

    @ModelType(CourseChapterDto)
    model: CourseChapterDto;
    constructor(private service:CourseChaptersService, coreSevice: CoreService){
        super("courseChapters",coreSevice, service);
    }

    @Post("test")
    @ApiBody({type: CourseChapterDto})
    async apiTest(@Body() param: CourseChapterDto){
        return null;
    }

}
