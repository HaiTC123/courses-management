// page-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PageRequest {
  @ApiProperty({ example: 10, description: 'Kích thước mỗi trang' })
  pageSize: number;

  @ApiProperty({ example: 1, description: 'Số thứ tự trang' })
  pageNumber: number;

  @ApiProperty({ example: '', description: 'Filter dạng JSON hoặc chuỗi điều kiện' })
  filter?: string;

  @ApiProperty({ example: 'createdAt', description: 'Trường sắp xếp' })
  sortOrder?: string;

  @ApiProperty({ example: '', description: 'Từ khóa tìm kiếm' })
  searchKey?: string;
}
