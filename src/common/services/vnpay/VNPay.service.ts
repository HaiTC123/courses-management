import { Injectable, Inject } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { DepositCoinRequest } from 'src/model/request/depositCoint.request';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { OrderInfo } from 'src/model/enum/order.enum';
import { PrismaService } from 'src/repo/prisma.service';
import { PaymentMethod } from 'src/model/enum/payment.enum';
import { VNPay } from 'vnpay';
import { VNPayLib } from './VNPayLib';

@Injectable()
export class VNPayService {
    private VNPVersion: string = "";
    private VNPTmnCode: string = "";
    private VNPReturnURL: string = "";
    private VNPURL: string = "";
    private VNPHashSecret: string = "";
    private LinkPayFail: string = "";
    private LinkPayCoinSuccess: string = "";
    constructor(
        protected readonly coreService: CoreService,
        protected readonly prismaService: PrismaService
    ) {
        this.VNPVersion = process.env.VNPVersion;
        this.VNPTmnCode = process.env.VNPTmnCode;
        this.VNPReturnURL = process.env.VNPReturnURL;
        this.VNPURL = process.env.VNPURL;
        this.VNPHashSecret = process.env.VNPHashSecret;
        this.LinkPayFail = process.env.LinkPayFail;
        this.LinkPayCoinSuccess = process.env.LinkPayCoinSuccess;
    }

    async paymentForCoin(request: DepositCoinRequest, coin: CoinEntity): Promise<string> {
        const id = await this.createTransaction(JSON.stringify(coin));
        const orderInfo = OrderInfo.DepositCoin;
        return this.doPayment({
            txnRef: id,
            amount: (request.numberCoin),
            lang: request.lang,
            bankCode: request.bankCode,
            orderInfo
        });
    }

    private doPayment({ bankCode = '', amount = 0, lang = 'vn', orderInfo = '', txnRef = '' }): string {
        const vnPayLib = new VNPay({
            tmnCode: this.VNPTmnCode,
            secureSecret: this.VNPHashSecret,
            vnp_Version: this.VNPVersion,
        });
        const urlString = vnPayLib.buildPaymentUrl({
            vnp_TxnRef: txnRef,
            vnp_Amount: amount,
            vnp_ReturnUrl: this.VNPReturnURL,
            vnp_OrderInfo: orderInfo,
            vnp_IpAddr: '127.0.0.1'
        })
        return urlString;
    }

    async processCallback(query: Record<string, string>): Promise<string> {
        const vnPayLib = new VNPayLib();
        for (const [key, value] of Object.entries(query)) {
            if (key.startsWith('vnp_') && value) {
                vnPayLib.addResponseData(key, value);
            }
        }

        const transactionID = vnPayLib.getResponseData('vnp_TxnRef');
        const amount = parseInt(vnPayLib.getResponseData('vnp_Amount')) / 100;
        const responseCode = vnPayLib.getResponseData('vnp_ResponseCode');
        const transactionStatus = vnPayLib.getResponseData('vnp_TransactionStatus');
        const orderInfo = vnPayLib.getResponseData('vnp_OrderInfo');
        const secureHash = vnPayLib.getResponseData('vnp_SecureHash');
        const checkSignature = vnPayLib.validateSignature(secureHash, this.VNPHashSecret);

        if (!checkSignature || responseCode !== '00' || transactionStatus !== '00') {
            return this.LinkPayFail;
        }

        const successLink = await this.handlePaymentBasedOnType(orderInfo, transactionID, amount);
        return successLink ? successLink : this.LinkPayFail;
    }

    private async handlePaymentBasedOnType(orderType: string, transactionID: string, amount: number): Promise<string | null> {
        switch (orderType) {
            case OrderInfo.DepositCoin:
                return await this.depositCoin(transactionID, amount) ? this.LinkPayCoinSuccess : null;
            default:
                return null;
        }
    }

    private async depositCoin(transactionID: string, amount: number): Promise<boolean> {
        const transaction = await this.prismaService.transaction.findUnique({
            where: { id: transactionID },
        });
        if (!transaction) return false;

        const coin = JSON.parse(transaction.infor);
        const existingCoin = await this.prismaService.coin.findUnique({ where: { id: coin.id } });
        if (!existingCoin) {
            await this.logPayFailCoin(coin.userId);
            return false;
        }

        existingCoin.amount += amount;
        await this.prismaService.coin.update({ where: { id: coin.id, userId: coin.userId }, data: { amount: existingCoin.amount } });
        await this.prismaService.transactionHistory.create({
            data: {
                userId: coin.userId,
                object: "Coin",// type coin
                description: `Nạp coin thành công với số tiền: ${amount}`,
                paymentMethod: PaymentMethod.BankOnline, //
                orderId: -1
            }
        });

        return true;
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

    private async createTransaction(rawData: string): Promise<string> {
        const transaction = await this.prismaService.transaction.create({
            data: {
                infor: rawData,
                id: this.generateTransactionID(),
                orderId: -1
            }
        });
        return transaction.id;
    }

    private generateTransactionID(): string {
        return Math.random().toString(36).substring(2, 12);
    }
}
