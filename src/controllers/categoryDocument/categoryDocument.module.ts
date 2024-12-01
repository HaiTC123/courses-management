import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CategoryDocumentController } from './categoryDocument.controller';
import { CategoryDocumentService } from './categoryDocument.service';
@Module({
  controllers: [CategoryDocumentController],
  providers: [AuthService, PrismaService, CategoryDocumentService]
})
export class CategoryDocumentModule { }