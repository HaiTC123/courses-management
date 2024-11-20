import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CoinsController } from './coin.controller';
import { CoinsService } from './coin.service';
import { VNPayService } from 'src/common/services/vnpay/VNPay.service';
@Module({
  controllers: [CoinsController],
  providers: [AuthService, PrismaService, CoinsService, VNPayService],
  imports: []
})
export class CoinsModule { }