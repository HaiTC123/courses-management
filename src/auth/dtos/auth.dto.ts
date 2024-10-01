import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsEnum,
    IsString,
    IsDate,
    IsBoolean,
    IsUrl,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';
import { Gender, AccountStatus } from '@prisma/client'; // Import enums từ Prisma
import { BaseDto } from 'src/base/dto/base.dto';

export class UserDto extends BaseDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    fullName: string;

    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string;

    @IsEnum(Gender)
    @IsOptional() // Gender có thể không cần nếu không truyền
    gender: Gender;

    @IsOptional()
    @IsDate()
    dateOfBirth: Date;

    @IsOptional()
    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine1: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressLine2: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    state: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    postalCode: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    country: string;

    @IsEnum(AccountStatus)
    @IsOptional()
    accountStatus: AccountStatus;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    profilePictureURL: string;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    bannerPictureURL: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description: string;

}
