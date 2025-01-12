import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CertificateEntity } from 'src/model/entity/certificate.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CertificateService extends BaseService<CertificateEntity, Prisma.CertificateCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
