import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CourseChapterEntity } from 'src/model/entity/course.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CourseChaptersService extends BaseService<CourseChapterEntity, Prisma.CourseChapterCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
}
