import { AutoMap } from "@automapper/classes";
import { BaseDto } from "./base.dto";
import { Role, Gender, AccountStatus } from "@prisma/client";
// user.entity.ts
export class UserDto extends BaseDto {
    @AutoMap()
    id: number; // Khóa chính, tự động tăng
    @AutoMap()
    fullName: string; // Họ và tên đầy đủ
    @AutoMap()
    email: string; // Địa chỉ email duy nhất
    @AutoMap()
    role: Role; // Vai trò người dùng (enum)
    @AutoMap()
    gender: Gender; // Giới tính (enum)
    @AutoMap()dateOfBirth?: Date; // Ngày sinh (có thể null)
    
    @AutoMap()
    phoneNumber?: string; // Số điện thoại (có thể null)
    @AutoMap()addressLine1?: string; // Địa chỉ 1 (có thể null)
    @AutoMap()addressLine2?: string; // Địa chỉ 2 (có thể null)
    @AutoMap()city?: string; // Thành phố (có thể null)
    @AutoMap()state?: string; // Bang hoặc tỉnh (có thể null)
    @AutoMap()postalCode?: string; // Mã bưu điện (có thể null)
    @AutoMap()country?: string; // Quốc gia (có thể null)
    @AutoMap()accountStatus: AccountStatus; // Trạng thái tài khoản (enum)
    @AutoMap()lastLogin?: Date; // Thời gian đăng nhập cuối cùng (có thể null)
    @AutoMap()createdAt: Date; // Thời gian tạo tài khoản
    @AutoMap()updatedAt: Date; // Thời gian cập nhật tài khoản
    @AutoMap()profilePictureURL?: string; // URL ảnh đại diện (có thể null)
    @AutoMap()bannerPictureURL?: string; // URL banner
    @AutoMap()description?: string; // Mô tả người dùng
    @AutoMap()inActive: boolean; // Tình trạng hoạt động    

    // Phương thức khởi tạo để tạo một UserEntity từ dữ liệu
    constructor(partial: Partial<BaseDto>) {
        super();
        Object.assign(this, partial);
    }
}