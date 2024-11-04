import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class EnrollmentDto extends BaseDto{
  @ApiProperty()
  @AutoMap()
  id: number; // Khóa chính tự động tăng

  @ApiProperty()
  @AutoMap()
  studentId: number; // Liên kết với sinh viên trong bảng Students

  @ApiProperty()
  @AutoMap()
  courseId: number; // Liên kết với khóa học trong bảng Courses

  @ApiProperty()
  @AutoMap()
  semesterId: number; // Liên kết với học kỳ trong bảng Semesters

  @ApiProperty()
  @AutoMap()
  enrollmentStatus: string; // Trạng thái đăng ký

  @ApiProperty()
  @AutoMap()
  grade?: number; // Điểm số của sinh viên cho khóa học (nếu có)

  @ApiProperty()
  @AutoMap()
  enrollmentDate: Date; // Ngày đăng ký khóa học

  @ApiProperty()
  @AutoMap()
  completionDate?: Date; // Ngày hoàn thành khóa học (nếu có)

}
