import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { BaseService } from './base.service';
import { CoreService } from 'src/core/core.service';
@Module({
    providers: [BaseService]
  })
export class BaseModule {}

