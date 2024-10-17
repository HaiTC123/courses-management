// page-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PageRequest {
  @ApiProperty()
  @IsInt()
  pageSize: number;

  @ApiProperty()
  @IsInt()
  pageNumber: number;

  @ApiProperty()
  @IsString()
  filter?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortOrder?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  searchKey?: string;
}
