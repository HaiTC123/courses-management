import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';

import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
@Module({
  controllers: [ProgressController],
  providers: [ AuthService ,PrismaService, ProgressService]
})
export class ProgressModule {}