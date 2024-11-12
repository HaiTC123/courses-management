import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { GoalsController } from './goal.controller';
import { GoalsService } from './goal.service';
@Module({
  controllers: [GoalsController],
  providers: [AuthService, PrismaService, GoalsService]
})
export class GoalsModule { }