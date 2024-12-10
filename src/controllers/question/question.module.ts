import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
@Module({
  controllers: [QuestionController],
  providers: [AuthService, PrismaService, QuestionService]
})
export class QuestionModule { }