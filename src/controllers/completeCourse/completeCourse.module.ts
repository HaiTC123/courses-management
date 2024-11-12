import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CompleteCoursesController } from './completeCourse.controller';
import { CompleteCoursesService } from './completeCourse.service';
@Module({
  controllers: [CompleteCoursesController],
  providers: [AuthService, PrismaService, CompleteCoursesService]
})
export class CompleteCoursesModule { }