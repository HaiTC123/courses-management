// core/services/mapper.service.ts
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { createMap } from '@automapper/core';
import { UserEnity } from 'src/model/entity/user.entity';
import { UserDto } from 'src/model/dto/user.dto';

@Injectable()
export class MapperService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.initializeMapper();
  }

  private initializeMapper() {
    // Khởi tạo các mapping profile
    createMap(this.mapper, UserEnity, UserDto);
    createMap(this.mapper, UserDto, UserEnity);
  }

  // Các hàm chuyển đổi
  mapUserToDto(user: UserEnity): UserDto {
    return this.mapper.map(user, UserDto, UserEnity);
  }

  mapDtoToUser(userDto: UserDto): UserEnity {
    return this.mapper.map(userDto, UserEnity, UserDto);
  }
}