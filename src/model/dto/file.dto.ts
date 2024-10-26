import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class FileDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  id: number; // Khóa chính, tự động tăng

  @ApiProperty()
  @AutoMap()
  fileKey: string; // Key của file từ UploadThing

  @ApiProperty()
  @AutoMap()
  fileUrl: string; // URL file từ UploadThing

  @ApiProperty()
  @AutoMap()
  appUrl: string; // Đường dẫn URL trong ứng dụng

  @ApiProperty()
  @AutoMap()
  fileName: string; // Tên file

  @ApiProperty()
  @AutoMap()
  fileType: string; // Loại file (ví dụ: image/png)

  @ApiProperty()
  @AutoMap()
  fileSize: number; // Kích thước file

  @ApiProperty()
  @AutoMap()
  isTemp: boolean; // Đánh dấu file là tạm thời hay không

  @ApiProperty()
  @AutoMap()
  associatedTableType?: string; // Loại bảng liên kết (User, Course, ...)

  @ApiProperty()
  @AutoMap()
  associatedTableId?: number; // ID của bảng liên kết

}
