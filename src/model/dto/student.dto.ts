import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class StudentDto extends BaseDto{
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  @ApiProperty()
  userId: number; // Liên kết với bảng User

  @AutoMap()
  @ApiProperty()
  user: UserDto; // Tham chiếu tới UserDto
  
}
