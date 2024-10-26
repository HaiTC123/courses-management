import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CourseLessonsController } from './courseLessons.controller';
import { CourseLessonsService } from './courseLessons.service';
@Module({
  controllers: [CourseLessonsController],
  providers: [ AuthService ,PrismaService, CourseLessonsService]
})
export class CourseLessonsModule {}