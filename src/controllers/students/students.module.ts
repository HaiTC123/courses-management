import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
@Module({
  controllers: [StudentsController],
  providers: [ AuthService ,PrismaService, StudentsService]
})
export class StudentsModule {}