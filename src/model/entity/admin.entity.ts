import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/model/entity/base.entity';

export class AdminEntity extends BaseEntity {
  @AutoMap()
  id: number; // Khóa chính, tự động tăng
  
  @AutoMap()
  userId: number; // Liên kết với bảng User
  
  @AutoMap()
  role: string; // Vai trò của Admin
  
  @AutoMap()
  accessLevel: number; // Cấp độ quyền truy cập
  
  lastActivity?: Date; // Thời gian hoạt động gần nhất của Admin


  // Phương thức khởi tạo để tạo một AdminEntity từ dữ liệu
  constructor(partial?: Partial<AdminEntity>) {
    super();
    Object.assign(this, partial);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
