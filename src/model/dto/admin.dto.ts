import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class AdminDto extends BaseDto{
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  @ApiProperty()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  @ApiProperty()
  role: string; // Vai trò của Admin
  
  @AutoMap()
  @ApiProperty()
  accessLevel: number; // Cấp độ quyền truy cập
  
  @AutoMap()
  @ApiProperty()
  lastActivity?: Date; // Thời gian hoạt động gần nhất của Admin
  
}
