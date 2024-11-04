import { AutoMap } from "@automapper/classes";
import { BaseDto } from "./base.dto";
import { Role, Gender, AccountStatus } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { StudentDto } from "./student.dto";
import { InstructorDto } from "./instructor.dto";
import { AdminDto } from "./admin.dto";
// user.entity.ts
export class UserDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number; // Khóa chính, tự động tăng
    @AutoMap()
    @ApiProperty()
    fullName: string; // Họ và tên đầy đủ
    @AutoMap()
    @ApiProperty()
    email: string; // Địa chỉ email duy nhất
    @AutoMap()
    @ApiProperty()
    role: Role; // Vai trò người dùng (enum)
    @AutoMap()
    @ApiProperty()
    gender: Gender; // Giới tính (enum)
    @AutoMap()
    @ApiProperty()
    dateOfBirth?: Date; // Ngày sinh (có thể null)
    
    @AutoMap()
    @ApiProperty()
    phoneNumber?: string; // Số điện thoại (có thể null)
    @AutoMap()
    @ApiProperty()
    addressLine1?: string; // Địa chỉ 1 (có thể null)
    @AutoMap()
    @ApiProperty()
    addressLine2?: string; // Địa chỉ 2 (có thể null)
    @AutoMap()
    @ApiProperty()
    city?: string; // Thành phố (có thể null)
    @AutoMap()
    @ApiProperty()
    state?: string; // Bang hoặc tỉnh (có thể null)
    @AutoMap()
    @ApiProperty()
    postalCode?: string; // Mã bưu điện (có thể null)
    @AutoMap()
    @ApiProperty()
    country?: string; // Quốc gia (có thể null)
    @AutoMap()
    accountStatus: AccountStatus; // Trạng thái tài khoản (enum)
    @AutoMap()lastLogin?: Date; // Thời gian đăng nhập cuối cùng (có thể null)
    @AutoMap()createdAt: Date; // Thời gian tạo tài khoản
    @AutoMap()updatedAt: Date; // Thời gian cập nhật tài khoản
    @AutoMap()
    @ApiProperty()
    profilePictureURL?: string; // URL ảnh đại diện (có thể null)
    @AutoMap()
    @ApiProperty()
    bannerPictureURL?: string; // URL banner
    @AutoMap()
    @ApiProperty()
    description?: string; // Mô tả người dùng
    @AutoMap()inActive: boolean; // Tình trạng hoạt động    

    // Phương thức khởi tạo để tạo một UserEntity từ dữ liệu
    constructor(partial: Partial<BaseDto>) {
        super();
        Object.assign(this, partial);
    }
}


export class UserDetail extends UserDto{
    student?: StudentDto;
    instructor?: InstructorDto;
    admin?: AdminDto;
}