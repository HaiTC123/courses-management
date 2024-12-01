import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ProgressService } from '../progress/progress.service';
@Module({
  controllers: [CoursesController],
  providers: [ AuthService ,PrismaService, CoursesService, ProgressService]
})
export class CoursesModule {}