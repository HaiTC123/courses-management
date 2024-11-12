import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/model/entity/base.entity';
import { UserEntity } from './user.entity';

export class InstructorEntity extends BaseEntity {
  @AutoMap()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  department: string; // Khoa hoặc bộ môn của giảng viên

  @AutoMap()
  user: UserEntity; // Tham chiếu tới UserEntity
  // Phương thức khởi tạo để tạo một InstructorEntity từ dữ liệu

}
