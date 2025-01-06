import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { GradeEntity } from './grade.entity';
import { Student } from '@prisma/client';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

export class EnrollmentEntity extends BaseEntity {
    @AutoMap()
    id: number; // Khóa chính tự động tăng

    @AutoMap()
    studentId: number; // Liên kết với sinh viên trong bảng Students

    @AutoMap()
    courseId: number; // Liên kết với khóa học trong bảng Courses

    @AutoMap()
    enrollmentStatus: string; // Trạng thái đăng ký

    @AutoMap()
    enrollmentDate: Date; // Ngày đăng ký khóa học

    @AutoMap()
    completionDate?: Date; // Ngày hoàn thành khóa học (nếu có)

    gradeDetail?: GradeEntity;
    
}

export class EnrollmentDetail extends EnrollmentEntity {
    student: StudentEntity;
    course: CourseEntity;
}
