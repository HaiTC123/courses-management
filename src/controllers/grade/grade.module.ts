import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { GradesController } from './grade.controller';
import { GradesService } from './grade.service';
@Module({
  controllers: [GradesController],
  providers: [AuthService, PrismaService, GradesService]
})
export class GradesModule { }