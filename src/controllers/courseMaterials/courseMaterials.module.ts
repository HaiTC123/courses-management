import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CourseLessonsController } from './courseMaterials.controller';
import { CourseMaterialsService } from './courseMaterials.service';
@Module({
  controllers: [CourseLessonsController],
  providers: [AuthService, PrismaService, CourseMaterialsService]
})
export class CourseMaterialsModule { }