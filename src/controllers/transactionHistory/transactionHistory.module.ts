import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { TransactionHistoryController } from './transactionHistory.controller';
import { TransactionHistoryService } from './transactionHistory.service';
@Module({
  controllers: [TransactionHistoryController],
  providers: [AuthService, PrismaService, TransactionHistoryService]
})
export class TransactionHistoryModule { }