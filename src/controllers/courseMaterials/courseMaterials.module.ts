import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CourseLessonsController } from './courseMaterials.controller';
import { CourseMaterialsService } from './courseMaterials.service';
import { ProgressService } from '../progress/progress.service';
@Module({
  controllers: [CourseLessonsController],
  providers: [AuthService, PrismaService, CourseMaterialsService, ProgressService]
})
export class CourseMaterialsModule { }