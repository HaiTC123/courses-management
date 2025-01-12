import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/repo/prisma.service';
import { CoreService } from 'src/core/core.service';
import { DepositCoinRequest } from 'src/model/request/depositCoint.request';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { OrderInfo } from 'src/model/enum/order.enum';
import { PaymentMethod } from 'src/model/enum/payment.enum';
import { ReturnURLRequest } from 'src/model/request/return.request';
const PayOS = require("@payos/node");


@Injectable()
export class PayOSService {
    private PAYOS_CLIENT_ID: string = "";
    private PAYOS_API_KEY: string = "";
    private PAYOS_CHECKSUM: string = "";
    private PAYOS_CALLBACKURL: string = "";
    private LinkPayFail: string = "";
    private LinkPayCoinSuccess: string = "";
    private LinkPayCancel: string = "";
    constructor(
        protected readonly coreService: CoreService,
        protected readonly prismaService: PrismaService
    ) {
        this.PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID;
        this.PAYOS_API_KEY = process.env.PAYOS_API_KEY;
        this.PAYOS_CHECKSUM = process.env.PAYOS_CHECKSUM;
        this.PAYOS_CALLBACKURL = process.env.PAYOS_CALLBACKURL;
        this.LinkPayFail = process.env.LinkPayFail;
        this.LinkPayCoinSuccess = process.env.LinkPayCoinSuccess;
        this.LinkPayCancel = process.env.LinkCancel;
    }

    async paymentForCoin(request: DepositCoinRequest, coin: CoinEntity): Promise<string> {
        coin.amount = request.numberCoin;
        const id = await this.createTransaction(JSON.stringify(coin));
        return this.doPayment({
            orderCode: id,
            amount: (request.numberCoin),
            name: "Nap coin",
            cancelUrl: this.getCancelURLCallBack(OrderInfo.DepositCoin),
            returnUrl: this.getReturnURLCallBack(OrderInfo.DepositCoin)
        });
    }
    private async doPayment({ name = "", desciption = '', amount = 0, orderCode, cancelUrl, returnUrl }): Promise<string> {
        const payos = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM);
        const requestData = {
            orderCode: orderCode,
            amount: amount,
            description: name || "Thanh toan don hang",
            cancelUrl: cancelUrl,
            returnUrl: returnUrl,
        };
        const paymentLink = await payos.createPaymentLink(requestData);
        return paymentLink.checkoutUrl;
    }

    async processReturnURL(query: Record<string, string>, orderType: string): Promise<string> {
        var returnRequest = new ReturnURLRequest();
        for (const [key, value] of Object.entries(query)) {
            if (Reflect.has(returnRequest, key)) {
                Reflect.set(returnRequest, key, value);
            }
        }
        // Hủy thanh toán
        // if (returnRequest.cancel == 'true') {
        //     return this.LinkPayCancel; 
        // }
        return await this.handlePaymentBasedOnType(orderType, returnRequest);
    }

    private async handlePaymentBasedOnType(orderType: string, returnRequest: ReturnURLRequest): Promise<string | null> {
        switch (orderType) {
            case OrderInfo.DepositCoin:
                const linkProcess = await this.depositCoin(returnRequest);
                return !linkProcess ? this.LinkPayCoinSuccess : linkProcess;
            default:
                return this.LinkPayFail;
        }
    }

    private async depositCoin(returnRequest: ReturnURLRequest): Promise<string> {
        const transactionID = parseInt(returnRequest.orderCode);
        const transaction = await this.prismaService.transaction.findUnique({
            where: { id: transactionID },
        });
        if (!transaction) return this.LinkPayFail;
        const coin = JSON.parse(transaction.infor);
        if (returnRequest.cancel == 'true'){
            await this.prismaService.transactionHistory.create({
                data: {
                    userId: coin.userId,
                    object: "Coin",// type coin
                    description: `Hủy đơn hàng ${transactionID}: nạp coin với số tiền: ${coin.amount} VNĐ`,
                    paymentMethod: PaymentMethod.BankOnline, //
                    orderId: -1
                }
            });
            return this.LinkPayCancel;
        }
        const existingCoin = await this.prismaService.coin.findUnique({ where: { id: coin.id } });
        if (!existingCoin) {
            await this.logPayFailCoin(coin.userId);
            return this.LinkPayFail;
        }

        existingCoin.amount += coin.amount;
        await this.prismaService.coin.update({ where: { id: coin.id, userId: coin.userId }, data: { amount: existingCoin.amount } });
        await this.prismaService.transactionHistory.create({
            data: {
                userId: coin.userId,
                object: "Coin",// type coin
                description: `Đơn hàng ${transactionID}: nạp coin thành công với số tiền: ${coin.amount} VNĐ`,
                paymentMethod: PaymentMethod.BankOnline, //
                orderId: -1
            }
        });

        return this.LinkPayCoinSuccess;
    }

    private async logPayFailCoin(userId: number) {
        await this.prismaService.transactionHistory.create({
            data: {
                userId,
                object: "Coin",
                description: 'Thanh toán nạp coin thất bại',
                paymentMethod: PaymentMethod.BankOnline,
                orderId: -1
            }

        });
    }

    private async createTransaction(rawData: string): Promise<number> {
        const transaction = await this.prismaService.transaction.create({
            data: {
                infor: rawData,
                id: this.generateRandomNumber(),
                orderId: -1
            }
        });
        return transaction.id;
    }

    private generateRandomNumber(): number {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;  // Đảm bảo luôn có 6 chữ số
        return randomNumber;
    }

    private getReturnURLCallBack(type): string {
        switch (type) {
            case OrderInfo.DepositCoin:
                return `${this.PAYOS_CALLBACKURL}/coins/returnurl`;
        }
    }
    private getCancelURLCallBack(type): string {
        switch (type) {
            case OrderInfo.DepositCoin:
                return `${this.PAYOS_CALLBACKURL}/coins/cancelurl`;
        }
    }

}


