import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class InstructorDto {
  @AutoMap()
  @ApiProperty()
  instructorId: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  @ApiProperty()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  @ApiProperty()
  department: string; // Khoa hoặc bộ môn của giảng viên
  
  @AutoMap()
  @ApiProperty()
  createdAt: Date; // Thời gian tạo bản ghi
  
  @AutoMap()
  @ApiProperty()
  updatedAt: Date; // Thời gian cập nhật bản ghi
}
