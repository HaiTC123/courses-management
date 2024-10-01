// base.dto.ts
import { IsOptional, IsDate, IsString } from 'class-validator';

export class BaseDto {
  @IsOptional()
  @IsDate()
  createdAt?: Date;  // Thời gian tạo

  @IsOptional()
  @IsDate()
  updatedAt?: Date;  // Thời gian cập nhật

  @IsOptional()
  @IsString()
  createdBy?: string; // Người tạo

  @IsOptional()
  @IsString()
  updatedBy?: string; // Người cập nhật
}
