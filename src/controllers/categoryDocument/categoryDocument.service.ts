import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CategoryDocumentEntity } from 'src/model/entity/categoryDocument.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CategoryDocumentService extends BaseService<CategoryDocumentEntity, Prisma.CategoryDocumentCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
