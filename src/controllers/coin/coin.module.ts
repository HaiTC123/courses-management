import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CoinsController } from './coin.controller';
import { CoinsService } from './coin.service';
import { PayOSService } from 'src/common/services/payos/PayOS.service' ;
@Module({
  controllers: [CoinsController],
  providers: [AuthService, PrismaService, CoinsService, PayOSService],
  imports: []
})
export class CoinsModule { }