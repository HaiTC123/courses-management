import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
@Module({
  controllers: [CertificateController],
  providers: [AuthService, PrismaService, CertificateService]
})
export class CertificateModule { }