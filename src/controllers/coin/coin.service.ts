import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { query } from 'express';
import { BaseService } from 'src/base/base.service';
// import { VNPayService } from 'src/common/services/vnpay/VNPay.service';
import { PayOSService } from 'src/common/services/payos/PayOS.service' ;
import { CoreService } from 'src/core/core.service';
import { CoinDto } from 'src/model/dto/coin.dto';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { OrderInfo } from 'src/model/enum/order.enum';
import { DepositCoinRequest } from 'src/model/request/depositCoint.request';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CoinsService extends BaseService<CoinEntity, Prisma.CoinCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService,
         protected readonly payosService: PayOSService 
    ) {
        super(prismaService, coreService)
    }

    private async upsertCoin(userId: number){
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
        return coin;
    }

    async getCoinByUserId(): Promise<CoinDto> {
        const userId = this._authService.getUserID();
        let coin = await this.upsertCoin(userId);

        // Chuyển đổi sang DTO để trả về
        return this._mapperService.mapData(coin, CoinEntity, CoinDto);
    }

    async depositCoin(request: DepositCoinRequest): Promise<string> {
        const userId = this._authService.getUserID();
        let coin = await this.upsertCoin(userId);
        return this.payosService.paymentForCoin(request, coin)
    }

    async processCallback(request: any){
        return await this.payosService.processReturnURL(request, OrderInfo.DepositCoin);
    }

    async processCancelURL(request: any){
        return await this.payosService.processReturnURL(request, OrderInfo.DepositCoin);
    }

    async processReturnURL(request: any){
        return await this.payosService.processReturnURL(request, OrderInfo.DepositCoin);
    }
}
