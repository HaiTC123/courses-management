import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { LearnPathsService } from './learnPaths.service';
import { CoreService } from 'src/core/core.service';
import { RolesGuard } from 'src/core/roles.guard';
import { InstructorDto } from 'src/model/dto/instructor.dto';
import { LearningPathEntity } from 'src/model/entity/learn.entity';
import { LearningPathDto } from 'src/model/dto/learn.dto';
import { Public } from 'src/utils/public.decorator';

@ApiTags('LearnPath')
@Controller('api/learnpath')
@UseGuards(AuthGuard, RolesGuard)
export class LearnPathsController extends BaseController<LearningPathEntity, Prisma.LearningPathCreateInput> {
    @EntityType(LearningPathEntity)
    entity: LearningPathEntity;

    @ModelType(LearningPathDto)
    model: LearningPathDto;
    constructor(private service:LearnPathsService, coreSevice: CoreService){
        super("learnPaths",coreSevice,service);
    }

    @Post("test")
    @ApiBody({type: LearningPathDto})
    async apiTest(@Body() param: LearningPathDto){
        return null;
    }

    @Get(":id/courses")
    @Public()
    async getLearnPathWithCourse(@Param('id')id: number){
        return this.service.getLearningPathWithCourses(id);
    }

}
