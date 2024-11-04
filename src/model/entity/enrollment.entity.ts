import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';

export class EnrollmentEntity extends BaseEntity {
    @AutoMap()
    id: number; // Khóa chính tự động tăng

    @AutoMap()
    studentId: number; // Liên kết với sinh viên trong bảng Students

    @AutoMap()
    courseId: number; // Liên kết với khóa học trong bảng Courses

    @AutoMap()
    semesterId: number; // Liên kết với học kỳ trong bảng Semesters

    @AutoMap()
    enrollmentStatus: string; // Trạng thái đăng ký

    @AutoMap()
    grade?: number; // Điểm số của sinh viên cho khóa học (nếu có)

    @AutoMap()
    enrollmentDate: Date; // Ngày đăng ký khóa học

    @AutoMap()
    completionDate?: Date; // Ngày hoàn thành khóa học (nếu có)


}
