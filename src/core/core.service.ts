// core/services/core.service.ts
import { Injectable } from '@nestjs/common';
import { MapperService } from 'src/base/mapper.service';
import { EmailService } from './email.service';
@Injectable()
export class CoreService {
  constructor(private readonly mapper: MapperService, private readonly emailService: EmailService) {

  }
  getMapperSerivce(){
    return this.mapper;
  }

  getEmailService(){
    return this.emailService;
  }
}
