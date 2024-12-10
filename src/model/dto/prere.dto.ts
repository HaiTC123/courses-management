import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { CourseDto } from './course.dto';

export class PrerequisiteDto {
  @ApiProperty()
  @AutoMap()
  id: number; // Khóa chính

  @ApiProperty()
  @AutoMap()
  courseId: number; // Khóa học yêu cầu điều kiện tiên quyết

  @ApiProperty()
  @AutoMap()
  prerequisiteCourseId: number; // Khóa học điều kiện tiên quyết

  // Optional references nếu muốn kèm thêm dữ liệu từ khóa học liên quan

  @ApiProperty()
  prerequisiteCourse: CourseDto;

  @ApiProperty()
  course: CourseDto;
}
