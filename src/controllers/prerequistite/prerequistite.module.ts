import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { PrerequisitesController } from './prerequistite.controller';
import { PrerequisitesService } from './prerequistite.service';
@Module({
  controllers: [PrerequisitesController],
  providers: [ AuthService ,PrismaService, PrerequisitesService]
})
export class PrerequisitesModule {}