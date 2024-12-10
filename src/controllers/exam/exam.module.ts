import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
@Module({
  controllers: [ExamController],
  providers: [AuthService, PrismaService, ExamService]
})
export class ExamModule { }