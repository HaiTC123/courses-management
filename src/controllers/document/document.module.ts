import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
@Module({
  controllers: [DocumentController],
  providers: [AuthService, PrismaService, DocumentService]
})
export class DocumentModule { }