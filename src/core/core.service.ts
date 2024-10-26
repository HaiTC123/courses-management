// core/services/core.service.ts
import { Injectable } from '@nestjs/common';
import { MapperService } from 'src/common/services/mapper.service';
import { EmailService } from '../common/services/email.service';
import { HttpContextService } from 'src/common/services/http-context.service';
import { UploadService } from 'src/common/services/upload.service';

@Injectable()
export class CoreService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly mapper: MapperService,
    private readonly emailService: EmailService,
    private readonly authService: HttpContextService
  ) {

  }
  getMapperSerivce() {
    return this.mapper;
  }

  getEmailService() {
    return this.emailService;
  }

  getAuthService(): HttpContextService {
    return this.authService;
  }

  getUploadFileService(): UploadService {
    return this.uploadService
  }
}
