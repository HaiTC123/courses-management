import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { LearnPathsController } from './learnPaths.controller';
import { LearnPathsService } from './learnPaths.service';
@Module({
  controllers: [LearnPathsController],
  providers: [ AuthService ,PrismaService, LearnPathsService]
})
export class LearnPathsModule {}