import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { InstructorsController } from './instructors.controller';
import { InstructorsService } from './instructors.service';
@Module({
  controllers: [InstructorsController],
  providers: [ AuthService ,PrismaService, InstructorsService]
})
export class InstructorsModule {}