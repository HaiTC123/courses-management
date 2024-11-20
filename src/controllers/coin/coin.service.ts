import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CoinDto } from 'src/model/dto/coin.dto';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CoinsService extends BaseService<CoinEntity, Prisma.CoinCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async getCoinByUserId(): Promise<CoinDto> {
        const userId = this._authService.getUserID();
        // Kiểm tra xem userId có bản ghi trong Coin không
        let coin = await this.repository.findOneWithCondition({
            userId
        });

        // Nếu không có, tạo bản ghi mới với amount = 0
        if (!coin) {
            coin = await this.prismaService.coin.create({
                data: {
                    amount: 0,
                    userId: userId,
                },
            });
        }

        // Chuyển đổi sang DTO để trả về
        return this._mapperService.mapData(coin, CoinEntity, CoinDto);
    }
}
