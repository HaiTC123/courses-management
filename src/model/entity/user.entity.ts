import { BaseEntity } from "./base.entity";
import { Role, Gender, AccountStatus, Student, Instructor, Admin } from "@prisma/client";
import { AutoMap } from '@automapper/classes';
// user.entity.ts
export class UserEntity extends BaseEntity {

  static ignoreFieldFilter = ["passwordHash"]
  id: number; // Khóa chính, tự động tăng
  @AutoMap()
  fullName: string; // Họ và tên đầy đủ
  @AutoMap()
  email: string; // Địa chỉ email duy nhất
  passwordHash: string; // Mã hóa mật khẩu
  @AutoMap()
  role: Role; // Vai trò người dùng (enum)
  @AutoMap()
  gender: Gender; // Giới tính (enum)
  @AutoMap()
  dateOfBirth?: Date; // Ngày sinh (có thể null)
  @AutoMap()
  phoneNumber?: string; // Số điện thoại (có thể null)
  @AutoMap()
  addressLine1?: string; // Địa chỉ 1 (có thể null)
  @AutoMap()
  addressLine2?: string; // Địa chỉ 2 (có thể null)
  @AutoMap()
  city?: string; // Thành phố (có thể null)
  @AutoMap()
  state?: string; // Bang hoặc tỉnh (có thể null)
  @AutoMap()
  postalCode?: string; // Mã bưu điện (có thể null)
  @AutoMap()
  country?: string; // Quốc gia (có thể null)
  @AutoMap()
  accountStatus: AccountStatus; // Trạng thái tài khoản (enum)
  lastLogin?: Date; // Thời gian đăng nhập cuối cùng (có thể null)
  createdAt: Date; // Thời gian tạo tài khoản
  updatedAt: Date; // Thời gian cập nhật tài khoản
  @AutoMap()
  profilePictureURL?: string; // URL ảnh đại diện (có thể null)
  @AutoMap()
  bannerPictureURL?: string; // URL banner
  @AutoMap()
  description?: string; // Mô tả người dùng

  inActive: boolean; // Tình trạng hoạt động
  isBlock: boolean = false; // Có bị chặn không

  student?: Student;
  instructor?: Instructor;
  admin?: Admin;
  studentId: number;
  adminId: number;
  instructorId: number;

  // Phương thức khởi tạo để tạo một UserEntity từ dữ liệu
  constructor(partial?: Partial<UserEntity>) {
    super()
    if (partial) {
      // Gán các giá trị từ partial vào entity
      Object.assign(this, partial);
    }


    // Thiết lập giá trị mặc định nếu cần
    this.role = this.role || Role.Student;
    this.inActive = this.inActive || false;
    this.isBlock = this.isBlock || false;
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date(); // Luôn cập nhật thời gian cập nhật
  }
}


