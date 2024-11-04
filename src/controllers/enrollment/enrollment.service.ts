import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { EnrollmentEntity } from 'src/model/entity/enrollment.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class ErrollmentsService extends BaseService<EnrollmentEntity, Prisma.EnrollmentCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
