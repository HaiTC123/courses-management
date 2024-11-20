import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class TransactionHistoryDto extends BaseDto{
    @AutoMap()
    @ApiProperty()
    id: number; // ID tự động tăng

    @AutoMap()
    orderId: number; // ID của đơn hàng

    @AutoMap()
    description: string; // Mô tả giao dịch

    @AutoMap()
    userId: number; // ID của người dùng

    @AutoMap()
    object: string; // Đối tượng liên quan

    @AutoMap()
    paymentMethod: number; // Phương thức thanh toán

}
