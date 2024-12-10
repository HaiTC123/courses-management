import { AutoMap } from '@automapper/classes';
import { CourseEntity } from './course.entity';
import { BaseEntity } from './base.entity';

export class PrerequisiteEntity extends BaseEntity {
  @AutoMap()
  id: number; // Khóa chính

  @AutoMap()
  courseId: number; // Khóa học yêu cầu điều kiện tiên quyết

  @AutoMap()
  prerequisiteCourseId: number; // Khóa học điều kiện tiên quyết

  // Tham chiếu đến các khóa học
  
  prerequisiteCourse: CourseEntity;

  course: CourseEntity;
}
