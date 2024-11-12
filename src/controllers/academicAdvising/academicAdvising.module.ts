import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { AcademicAdvisingsController } from './academicAdvising.controller';
import { AcademicAdvisingsService } from './academicAdvising.service';
@Module({
  controllers: [AcademicAdvisingsController],
  providers: [AuthService, PrismaService, AcademicAdvisingsService]
})
export class AcademicAdvisingsModule { }