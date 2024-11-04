import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class SemesterDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number; // Khóa chính tự động tăng

    @ApiProperty()
    @AutoMap()
    name: string; // Tên học kỳ

    @ApiProperty()
    @AutoMap()
    startDate: Date; // Ngày bắt đầu học kỳ

    @ApiProperty()
    @AutoMap()
    endDate: Date; // Ngày kết thúc học kỳ

    @ApiProperty()
    @AutoMap()
    isCurrent: boolean; // Xác định nếu học kỳ hiện tại

}
