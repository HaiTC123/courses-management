import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { FailedCoursesController } from './failedCourse.controller';
import { FailedCoursesService } from './failedCourse.service';
@Module({
  controllers: [FailedCoursesController],
  providers: [AuthService, PrismaService, FailedCoursesService]
})
export class FailedCoursesModule { }