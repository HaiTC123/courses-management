import { CourseStatus, Instructor } from '@prisma/client';
// CourseEntity.ts
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/model/entity/base.entity';
import { EnrollmentEntity } from './enrollment.entity';

export class CourseEntity extends BaseEntity{
  @AutoMap()
  id: number; // Khóa chính, tự động tăng

  @AutoMap()
  courseCode: string; // Mã khóa học (duy nhất)

  @AutoMap()
  courseName: string; // Tên khóa học

  @AutoMap()
  description?: string; // Mô tả chi tiết khóa học

  @AutoMap()
  credits: number; // Số tín chỉ của khóa học

  @AutoMap()
  instructorId?: number; // Liên kết với giảng viên


  @AutoMap()
  prerequisiteCourseIds?: string; // Khóa học tiên quyết

  @AutoMap()
  durationWeeks: number; // Thời lượng khóa học (tuần)

  @AutoMap()
  score: number; // Điểm để pass

  @AutoMap()
  category?: string; // Phân loại khóa học

  @AutoMap()
  isMandatory: boolean; // Khóa học bắt buộc hay tự chọn

  @AutoMap()
  price: number; // Giá khóa học

  @AutoMap()
  isFree: boolean; // Khóa học miễn phí

  @AutoMap()
  createdAt: Date; // Thời gian tạo bản ghi

  @AutoMap()
  updatedAt: Date; // Thời gian cập nhật bản ghi

  @AutoMap()
  status: CourseStatus; // Vai trò người dùng (enum)


  instructor: Instructor;

  @AutoMap()
  enrollment: EnrollmentEntity[];

  @AutoMap()
  enrollmentsCount: number;

  @AutoMap()
  backgroundUrl?:string;
}

// CourseChapterEntity.ts
export class CourseChapterEntity extends BaseEntity{
  @AutoMap()
  id: number; // Khóa chính

  @AutoMap()
  courseId: number; // Liên kết với bảng Course

  @AutoMap()
  chapterTitle: string; // Tiêu đề chương

  @AutoMap()
  chapterDescription?: string; // Mô tả chương

  @AutoMap()
  chapterOrder: number; // Thứ tự chương

}

// CourseLessonEntity.ts
export class CourseLessonEntity extends BaseEntity{
  @AutoMap()
  id: number; // Khóa chính

  @AutoMap()
  chapterId: number; // Liên kết với bảng CourseChapter

  @AutoMap()
  lessonTitle: string; // Tiêu đề bài học

  @AutoMap()
  lessonDescription?: string; // Mô tả bài học

  @AutoMap()
  durationMinutes?: number; // Thời lượng bài học

  @AutoMap()
  lessonOrder: number; // Thứ tự bài học
}

// CourseMaterialEntity.ts
export class CourseMaterialEntity extends BaseEntity{
  @AutoMap()
  id: number; // Khóa chính

  @AutoMap()
  lessonId: number; // Liên kết với bảng CourseLesson

  @AutoMap()
  materialType: string; // Loại tài liệu (Video, PDF, Word, PowerPoint, Link)

  @AutoMap()
  materialTitle: string; // Tiêu đề tài liệu

  @AutoMap()
  materialURL: string; // Đường dẫn tới tài liệu

  @AutoMap()
  materialDescription?: string; // Mô tả tài liệu

  @AutoMap()
  isRequired: boolean; // Tài liệu bắt buộc hay không

  @AutoMap()
  durationMinutes?: number; // Thời lượng tài liệu (nếu có)



}
