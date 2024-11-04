import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { LearnPathCoursesController } from './learnPathCourses.controller';
import { LearnPathCoursesService } from './learnPathCourses.service';
@Module({
  controllers: [LearnPathCoursesController],
  providers: [ AuthService ,PrismaService, LearnPathCoursesService]
})
export class LearnPathCoursesModule {}