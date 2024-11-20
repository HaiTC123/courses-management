import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { WorkerService } from './worker.service';

@Module({
  providers: [PrismaService, WorkerService ]
})
export class WorkerModule {}
