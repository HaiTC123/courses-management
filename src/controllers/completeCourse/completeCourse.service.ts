import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CourseCompletionEntity } from 'src/model/entity/course-complete.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CompleteCoursesService extends BaseService<CourseCompletionEntity, Prisma.CourseCompletionCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
}
