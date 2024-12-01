import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { JobConfigController } from './jobConfig.controller';
import { JobConfigService } from './jobConfig.service';
@Module({
  controllers: [JobConfigController],
  providers: [AuthService, PrismaService, JobConfigService]
})
export class JobConfigModule { }