import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';

export class InstructorDto extends BaseDto{
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  @ApiProperty()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  @ApiProperty()
  department: string; // Khoa hoặc bộ môn của giảng viên
  
  @AutoMap()
  @ApiProperty()
  user: UserDto; // Tham chiếu tới UserDto
}
