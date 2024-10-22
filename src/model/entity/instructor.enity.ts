import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/model/entity/base.entity';

export class InstructorEntity extends BaseEntity {
  @AutoMap()
  instructorId: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  department: string; // Khoa hoặc bộ môn của giảng viên
  
  createdAt: Date; // Thời gian tạo bản ghi
  updatedAt: Date; // Thời gian cập nhật bản ghi

  // Phương thức khởi tạo để tạo một InstructorEntity từ dữ liệu
  constructor(partial?: Partial<InstructorEntity>) {
    super();
    Object.assign(this, partial);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
