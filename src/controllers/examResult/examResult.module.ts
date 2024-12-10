import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { ExamResultController } from './examResult.controller';
import { ExamResultService } from './examResult.service';
@Module({
  controllers: [ExamResultController],
  providers: [AuthService, PrismaService, ExamResultService]
})
export class ExamResultModule { }