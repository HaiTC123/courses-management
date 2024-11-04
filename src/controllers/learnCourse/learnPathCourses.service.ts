import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { LearningPathCourseEntity } from 'src/model/entity/learn.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class LearnPathCoursesService extends BaseService<LearningPathCourseEntity, Prisma.LearningPathCourseCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }


}
