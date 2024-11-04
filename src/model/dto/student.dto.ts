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
  major: string; // Chuyên ngành của sinh viên
  
  @AutoMap()
  @ApiProperty()
  yearOfStudy: number; // Năm học của sinh viên
  
  @AutoMap()
  @ApiProperty()
  gpa: Decimal; // Điểm trung bình tích lũy (GPA)
  
  @AutoMap()
  @ApiProperty()
  graduationStatus: string; // Trạng thái tốt nghiệp

  @AutoMap()
  @ApiProperty()
  user: UserDto; // Tham chiếu tới UserDto
  
}
