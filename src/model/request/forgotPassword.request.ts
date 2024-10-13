import {
    IsNotEmpty,
    IsEmail,
    IsString
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPassswordRequest {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    email: string
}

