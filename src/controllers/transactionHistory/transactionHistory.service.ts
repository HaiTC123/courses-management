import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { TransactionHistoryEntity } from 'src/model/entity/transactionHistory.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class TransactionHistoryService extends BaseService<TransactionHistoryEntity, Prisma.TransactionHistoryCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
