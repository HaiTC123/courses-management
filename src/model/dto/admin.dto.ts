import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class AdminDto {
  @AutoMap()
  @ApiProperty()
  adminId: number; // Khóa chính, tự động tăng
  
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
  
  @AutoMap()
  @ApiProperty()
  createdAt: Date; // Thời gian tạo bản ghi
  
  @AutoMap()
  @ApiProperty()
  updatedAt: Date; // Thời gian cập nhật bản ghi
}
