import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
@Module({
  controllers: [CoursesController],
  providers: [ AuthService ,PrismaService, CoursesService]
})
export class CoursesModule {}