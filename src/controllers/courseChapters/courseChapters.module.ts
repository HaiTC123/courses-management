import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CourseChaptersController } from './courseChapters.controller';
import { CourseChaptersService } from './courseChapters.service';
@Module({
  controllers: [CourseChaptersController],
  providers: [ AuthService ,PrismaService, CourseChaptersService]
})
export class CourseChaptersModule {}