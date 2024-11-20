import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { TransactionHistoryEntity } from 'src/model/entity/transactionHistory.entity';
import { TransactionHistoryService } from './transactionHistory.service';
import { TransactionHistoryDto } from 'src/model/dto/transactionHistory.dto';


@ApiTags('TransactionHistory')
@Controller('api/transactionHistory')
@UseGuards(AuthGuard)
export class TransactionHistoryController extends BaseController<TransactionHistoryEntity, Prisma.TransactionHistoryCreateInput> {
    @EntityType(TransactionHistoryEntity)
    entity: TransactionHistoryEntity;

    @ModelType(TransactionHistoryDto)
    model: TransactionHistoryDto;
    constructor(private service: TransactionHistoryService, coreSevice: CoreService) {
        super("transactionHistory", coreSevice, service);
    }

}
