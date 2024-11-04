import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';

export class CourseCompletionEntity extends BaseEntity{
  @AutoMap()
  id: number; // Khóa chính

  @AutoMap()
  studentId: number; // Liên kết với bảng Students

  @AutoMap()
  courseId: number; // Liên kết với bảng Courses

  @AutoMap()
  enrollmentId: number; // Liên kết với bảng Enrollments

  @AutoMap()
  semesterId: number; // Liên kết với bảng Semesters

  @AutoMap()
  completionDate: Date; // Ngày hoàn thành khóa học

  @AutoMap()
  finalGrade?: number; // Điểm số cuối cùng

  @AutoMap()
  certificationUrl?: string; // Liên kết đến chứng chỉ

}
