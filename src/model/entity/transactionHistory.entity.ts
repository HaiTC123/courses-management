import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionHistoryEntity extends BaseEntity{
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
