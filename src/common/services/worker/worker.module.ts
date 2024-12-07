import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { WorkerService } from './worker.service';
import { CoursesService } from 'src/controllers/courses/courses.service';
import { ProgressService } from 'src/controllers/progress/progress.service';

@Module({
  providers: [PrismaService, WorkerService, CoursesService, ProgressService ]
})
export class WorkerModule {}
