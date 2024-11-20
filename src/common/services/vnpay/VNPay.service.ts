import { Injectable, Inject } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { VNPayLib } from './vnpay.lib';
import { PrismaService } from 'src/repo/prisma.service';
import { DepositCoinRequest } from 'src/model/request/depositCoint.request';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { OrderInfo } from 'src/model/enum/order.enum';

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
        coreService: CoreService,
        prismaService: PrismaService
    ) {
        this.VNPVersion = process.env.VNPVersion;
        this.VNPTmnCode = process.env.VNPTmnCode;
        this.VNPReturnURL = process.env.VNPReturnURL;
        this.VNPURL = process.env.VNPURL;
        this.VNPHashSecret = process.env.VNPHashSecret;
        this.LinkPayFail = process.env.LinkPayFail;
        this.LinkPayCoinSuccess = process.env.LinkPayCoinSuccess;
    }

    async paymentDepositAuction(request: DepositCoinRequest, coin: CoinEntity): Promise<string> {
        const id = await this.createTransaction(JSON.stringify(coin));
        const orderInfo = OrderInfo.DepositCoin;
        return this.doPayment({
            txnRef: id,
            amount: (request.numberCoin * 100).toString(),
            lang: request.lang,
            bankCode: request.bankCode,
            orderInfo
        });
    }

    private doPayment({ bankCode = '', amount = '', lang = 'vn', orderInfo = '', txnRef = '' }): string {
        const vnPayLib = new VNPayLib();
        vnPayLib.addRequestData('vnp_Version', this.VNPVersion);
        vnPayLib.addRequestData('vnp_Command', 'pay');
        vnPayLib.addRequestData('vnp_TmnCode', this.VNPTmnCode);
        vnPayLib.addRequestData('vnp_Amount', amount);
        vnPayLib.addRequestData('vnp_BankCode', bankCode);
        vnPayLib.addRequestData('vnp_CreateDate', new Date().toISOString().replace(/[-:]/g, '').slice(0, 14));
        vnPayLib.addRequestData('vnp_CurrCode', 'VND');
        vnPayLib.addRequestData('vnp_IpAddr', '127.0.0.1');
        vnPayLib.addRequestData('vnp_Locale', lang);
        vnPayLib.addRequestData('vnp_OrderInfo', orderInfo);
        vnPayLib.addRequestData('vnp_OrderType', 'other');
        vnPayLib.addRequestData('vnp_ReturnUrl', this.VNPReturnURL);
        vnPayLib.addRequestData('vnp_TxnRef', txnRef);
        return vnPayLib.createRequestUrl(this.VNPURL, this.VNPHashSecret);
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
        const transaction = await this.unitOfWork.transactions.findOne({ transactionID });
        if (!transaction) return false;

        const coin = JSON.parse(transaction.infor) as Coin;
        const existingCoin = await this.prisma.coin.findUnique({ where: { id: coin.coinId } });
        if (!existingCoin) {
            await this.logPayFailCoin(coin.userId);
            return false;
        }

        existingCoin.amount += amount;
        await this.prisma.coin.update({ where: { id: coin.coinId }, data: { amount: existingCoin.amount } });
        await this.transactionHistoryService.logTransaction({
            userId: coin.userId,
            objectType: ObjectType.Coin,
            description: `Nạp coin thành công với số tiền: ${amount}`,
            paymentMethod: PaymentMethod.BankOnline
        });

        return true;
    }

    private async logPayFailCoin(userId: number) {
        await this.transactionHistoryService.logTransaction({
            userId,
            objectType: ObjectType.Coin,
            description: 'Thanh toán nạp coin thất bại',
            paymentMethod: PaymentMethod.BankOnline
        });
    }

    private async createTransaction(rawData: string): Promise<string> {
        const transaction = await this.unitOfWork.transactions.create({
            data: {
                infor: rawData,
                transactionID: this.generateTransactionID()
            }
        });
        return transaction.transactionID;
    }

    private generateTransactionID(): string {
        return Math.random().toString(36).substring(2, 12);
    }
}
