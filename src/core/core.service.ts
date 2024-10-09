// core/services/core.service.ts
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { MapperService } from 'src/base/mapper.service';
@Injectable()
export class CoreService {
  constructor(private readonly mapper: MapperService) {

  }
  getMapperSerivce(){
    return this.mapper;
  }
}
