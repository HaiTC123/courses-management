import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';
@Module({
  controllers: [SemesterController],
  providers: [AuthService, PrismaService, SemesterService]
})
export class SemesterModule { }