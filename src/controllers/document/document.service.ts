import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { DocumentEntity } from 'src/model/entity/document.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class DocumentService extends BaseService<DocumentEntity, Prisma.DocumentCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
