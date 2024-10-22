import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class StudentDto {
  @AutoMap()
  @ApiProperty()
  studentId: number; // Khóa chính, tự động tăng
  
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
  gpa?: number; // Điểm trung bình tích lũy (GPA)
  
  @AutoMap()
  @ApiProperty()
  graduationStatus: string; // Trạng thái tốt nghiệp
  
  @AutoMap()
  @ApiProperty()
  createdAt: Date; // Thời gian tạo bản ghi
  
  @AutoMap()
  @ApiProperty()
  updatedAt: Date; // Thời gian cập nhật bản ghi
}
