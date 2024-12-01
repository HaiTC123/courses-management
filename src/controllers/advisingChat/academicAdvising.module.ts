import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { ChatadvisingChatController } from './academicAdvising.controller';
import { AdvisingChatService } from './academicAdvising.service';
@Module({
  controllers: [ChatadvisingChatController],
  providers: [AuthService, PrismaService, AdvisingChatService]
})
export class AdvisingChatModule { }