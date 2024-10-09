import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsEnum,
    IsString,
    IsDateString,
    IsUrl,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';
import { Gender, AccountStatus } from '@prisma/client'; // Import enums từ Prisma
import { BaseDto } from 'src/base/dto/base.dto';
import { AutoMap } from '@automapper/classes';
export class RegisterDto extends BaseDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    fullName: string;

    @IsEmail()
    @MaxLength(255)
    @AutoMap()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    @AutoMap()
    password: string;

    @IsEnum(Gender)
    @IsOptional() // Gender có thể không cần nếu không truyền
    @AutoMap()
    gender: Gender;

    @IsOptional()
    @IsDateString()
    @AutoMap()
    dateOfBirth: Date;

    @IsOptional()
    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    @AutoMap()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    addressLine1: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    addressLine2: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    state: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @AutoMap()
    postalCode: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    country: string;

    @IsEnum(AccountStatus)
    @IsOptional()
    @AutoMap()
    accountStatus: AccountStatus;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    @AutoMap()
    profilePictureURL: string;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    @AutoMap()
    bannerPictureURL: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    description: string;

}
