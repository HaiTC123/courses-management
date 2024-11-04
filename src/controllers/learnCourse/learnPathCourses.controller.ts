import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { RolesGuard } from 'src/core/roles.guard';
import { LearningPathCourseEntity } from 'src/model/entity/learn.entity';
import { LearningPathCourseDto } from 'src/model/dto/learn.dto';
import { LearnPathCoursesService } from './learnPathCourses.service';

@ApiTags('LearnCourse')
@Controller('api/learncourse')
@UseGuards(AuthGuard, RolesGuard)
export class LearnPathCoursesController extends BaseController<LearningPathCourseEntity, Prisma.LearningPathCourseCreateInput> {
    @EntityType(LearningPathCourseEntity)
    entity: LearningPathCourseEntity;

    @ModelType(LearningPathCourseDto)
    model: LearningPathCourseDto;
    constructor(private service:LearnPathCoursesService, coreSevice: CoreService){
        super("learnPathCourse",coreSevice,service);
    }

    @Post("test")
    @ApiBody({type: LearningPathCourseDto})
    async apiTest(@Body() param: LearningPathCourseDto){
        return null;
    }

}
