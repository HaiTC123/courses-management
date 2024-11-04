import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/model/entity/base.entity';
import { UserEntity } from './user.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class StudentEntity extends BaseEntity {
  @AutoMap()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  major: string; // Chuyên ngành của sinh viên
  
  @AutoMap()
  yearOfStudy: number; // Năm học của sinh viên
  
  @AutoMap()
  gpa: Decimal; // Điểm trung bình tích lũy (GPA)
  
  @AutoMap()
  graduationStatus: string; // Trạng thái tốt nghiệp

  @AutoMap()
  user: UserEntity; // Tham chiếu tới UserEntity
  
  // Phương thức khởi tạo để tạo một StudentEntity từ dữ liệu
  constructor(partial?: Partial<StudentEntity>) {
    super();
    Object.assign(this, partial);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
