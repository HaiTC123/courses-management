import { BaseEntity } from "./base.entity";
import { Role, Gender, AccountStatus } from "@prisma/client";
// user.entity.ts
export class UserEntity extends BaseEntity {
    id: number; // Khóa chính, tự động tăng
    fullName: string; // Họ và tên đầy đủ
    email: string; // Địa chỉ email duy nhất
    passwordHash: string; // Mã hóa mật khẩu
    role: Role; // Vai trò người dùng (enum)
    gender: Gender; // Giới tính (enum)
    dateOfBirth?: Date; // Ngày sinh (có thể null)
    phoneNumber?: string; // Số điện thoại (có thể null)
    addressLine1?: string; // Địa chỉ 1 (có thể null)
    addressLine2?: string; // Địa chỉ 2 (có thể null)
    city?: string; // Thành phố (có thể null)
    state?: string; // Bang hoặc tỉnh (có thể null)
    postalCode?: string; // Mã bưu điện (có thể null)
    country?: string; // Quốc gia (có thể null)
    accountStatus: AccountStatus; // Trạng thái tài khoản (enum)
    lastLogin?: Date; // Thời gian đăng nhập cuối cùng (có thể null)
    createdAt: Date; // Thời gian tạo tài khoản
    updatedAt: Date; // Thời gian cập nhật tài khoản
    profilePictureURL?: string; // URL ảnh đại diện (có thể null)
    bannerPictureURL?: string; // URL banner
    description?: string; // Mô tả người dùng
    inActive: boolean; // Tình trạng hoạt động
    isBlock: boolean = false; // Có bị chặn không

    // Phương thức khởi tạo để tạo một UserEntity từ dữ liệu
    constructor(partial: Partial<UserEntity>) {
        super()
        // Gán các giá trị từ partial vào entity
        Object.assign(this, partial);
    
        // Thiết lập giá trị mặc định nếu cần
        this.role = this.role || Role.Student;
        this.inActive = this.inActive || false;
        this.isBlock = this.isBlock || false;
        this.createdAt = this.createdAt || new Date();
        this.updatedAt = new Date(); // Luôn cập nhật thời gian cập nhật
      }
}
