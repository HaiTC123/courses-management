// CourseDto.ts
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { CourseStatus } from '@prisma/client';
import { EnrollmentDto } from './errollment.dto';
import { InstructorDto } from './instructor.dto';
import { ExamDto } from './exam.dto';

export class CourseDto extends BaseDto{
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính

  @AutoMap()
  @ApiProperty()
  courseCode: string; // Mã khóa học

  @AutoMap()
  score: number; // Điểm để pass
  
  @AutoMap()
  @ApiProperty()
  courseName: string; // Tên khóa học

  @AutoMap()
  @ApiProperty()
  description?: string; // Mô tả chi tiết

  @AutoMap()
  @ApiProperty()
  credits: number; // Số tín chỉ

  @AutoMap()
  @ApiProperty()
  instructorId?: number; // ID của giảng viên

  @AutoMap()
  @ApiProperty()
  durationWeeks: number; // Thời lượng khóa học (tuần)

  @AutoMap()
  @ApiProperty()
  category?: string; // Phân loại khóa học

  @AutoMap()
  @ApiProperty()
  isMandatory: boolean; // Khóa học bắt buộc hay không

  @AutoMap()
  @ApiProperty()
  price: number; // Giá khóa học

  @AutoMap()
  @ApiProperty()
  isFree: boolean; // Khóa học miễn phí hay không

  @AutoMap()
  @ApiProperty()
  status: CourseStatus; // Vai trò người dùng (enum)

  @AutoMap()
  enrollment: EnrollmentDto[];

  @AutoMap()
  enrollmentsCount: number;

  @AutoMap()
  @ApiProperty()
  backgroundUrl?:string;

  instructor: InstructorDto;
  exam: ExamDto[];
}

// CourseChapterDto.ts
export class CourseChapterDto {
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính

  @AutoMap()
  @ApiProperty()
  courseId: number; // ID khóa học liên kết

  @AutoMap()
  @ApiProperty()
  chapterTitle: string; // Tiêu đề chương

  @AutoMap()
  @ApiProperty()
  chapterDescription?: string; // Mô tả chương

  @AutoMap()
  @ApiProperty()
  chapterOrder: number; // Thứ tự chương

}

// CourseLessonDto.ts
export class CourseLessonDto {
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính

  @AutoMap()
  @ApiProperty()
  chapterId: number; // Liên kết với chương học

  @AutoMap()
  @ApiProperty()
  lessonTitle: string; // Tiêu đề bài học

  @AutoMap()
  @ApiProperty()
  lessonDescription?: string; // Mô tả bài học

  @AutoMap()
  @ApiProperty()
  durationMinutes?: number; // Thời lượng bài học

  @AutoMap()
  @ApiProperty()
  lessonOrder: number; // Thứ tự bài học

}

// CourseMaterialDto.ts
export class CourseMaterialDto {
  @AutoMap()
  @ApiProperty()
  id: number; // Khóa chính

  @AutoMap()
  @ApiProperty()
  lessonId: number; // Liên kết với bài học

  @AutoMap()
  @ApiProperty()
  materialType: string; // Loại tài liệu

  @AutoMap()
  @ApiProperty()
  materialTitle: string; // Tiêu đề tài liệu

  @AutoMap()
  @ApiProperty()
  materialURL: string; // Đường dẫn tới tài liệu

  @AutoMap()
  @ApiProperty()
  materialDescription?: string; // Mô tả tài liệu

  @AutoMap()
  @ApiProperty()
  isRequired: boolean; // Tài liệu bắt buộc hay không

  @AutoMap()
  @ApiProperty()
  durationMinutes?: number; // Thời lượng tài liệu (nếu có)


}
