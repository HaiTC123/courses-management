import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { AdvisingStatus, Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { ExamResultEntity } from 'src/model/entity/examResult.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class ExamResultService extends BaseService<ExamResultEntity, Prisma.ExamResultCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
