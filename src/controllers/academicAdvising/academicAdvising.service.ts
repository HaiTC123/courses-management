import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { AcademicAdvisingEntity } from 'src/model/entity/grade.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class AcademicAdvisingsService extends BaseService<AcademicAdvisingEntity, Prisma.AcademicAdvisingCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
}
