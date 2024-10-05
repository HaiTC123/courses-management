import { RegisterDto } from './../auth/dtos/auth.dto';
// core/services/mapper.service.ts
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { createMap } from '@automapper/core';
import { UserEntity } from 'src/model/entity/user.entity';
import { UserDto } from 'src/model/dto/user.dto';

@Injectable()
export class MapperService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.initializeMapper();
  }

  private initializeMapper() {
    // Khởi tạo các mapping profile
    createMap(this.mapper, UserEntity, UserDto);
    createMap(this.mapper, UserDto, UserEntity);
  }

  // Các hàm chuyển đổi
  mapUserToDto(user: UserEntity): UserDto {
    return this.mapper.map(user, UserDto, UserEntity);
  }

  mapDtoToUser(userDto: UserDto): UserEntity {
    return this.mapper.map(userDto, UserEntity, UserDto);
  }

  mapRegisterDtoToUser(registerDto: RegisterDto): UserEntity{
      // Map sang Partial<UserEntity> trước
      const partialUser = this.mapper.map<Partial<UserEntity>>(registerDto, UserEntity, RegisterDto);

      // Khởi tạo UserEntity từ partial object
      return new UserEntity({
        ...partialUser,
        role: partialUser.role || 'Student', // Đặt giá trị mặc định nếu cần
        inActive: partialUser.inActive || false,
        isBlock: partialUser.isBlock || false,
      });
  }

}