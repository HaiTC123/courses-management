import {
    IsNotEmpty,
    IsEmail,
    IsString
} from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginRequest {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    email: string

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    password: string
}

