import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { ErrollmentsController } from './enrollment.controller';
import { ErrollmentsService } from './enrollment.service';
@Module({
  controllers: [ErrollmentsController],
  providers: [ AuthService ,PrismaService, ErrollmentsService]
})
export class ErrollmentsModule {}