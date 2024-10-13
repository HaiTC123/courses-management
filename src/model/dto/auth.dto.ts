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
import { BaseDto } from 'src/model/dto/base.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto extends BaseDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    fullName: string;

    @IsEmail()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    password: string;

    @IsEnum(Gender)
    @IsOptional()
    @AutoMap()
    @ApiProperty()
    gender: Gender;

    @IsOptional()
    @IsDateString()
    @AutoMap()
    @ApiProperty()
    dateOfBirth: Date;

    @IsOptional()
    @Matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    @AutoMap()
    @ApiProperty()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    addressLine1: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    addressLine2: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    @ApiProperty()
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    @ApiProperty()
    state: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @AutoMap()
    @ApiProperty()
    postalCode: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @AutoMap()
    @ApiProperty()
    country: string;

    @IsEnum(AccountStatus)
    @IsOptional()
    @AutoMap()
    @ApiProperty()
    accountStatus: AccountStatus;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    profilePictureURL: string;

    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    bannerPictureURL: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @AutoMap()
    @ApiProperty()
    description: string;

}
