import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

@Injectable()
export class VNPayLib {
  private _requestData: Map<string, string> = new Map();
  private _responseData: Map<string, string> = new Map();

  addRequestData(key: string, value: string): void {
    if (value) {
      this._requestData.set(key, value);
    }
  }

  addResponseData(key: string, value: string): void {
    if (value) {
      this._responseData.set(key, value);
    }
  }

  createRequestUrl(baseUrl: string, vnp_HashSecret: string): string {
    const sortedData = Array.from(this._requestData.entries()).sort();
    const data = sortedData
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const signData = data.length > 0 ? data.slice(0, -1) : data;
    const vnp_SecureHash = this.hmacSHA512(vnp_HashSecret, signData);

    return `${baseUrl}?${data}&vnp_SecureHash=${vnp_SecureHash}`;
  }

  private hmacSHA512(key: string, inputData: string): string {
    return crypto.createHmac('sha512', key).update(inputData).digest('hex');
  }

  getResponseData(key: string): string {
    return this._responseData.get(key) || '';
  }

  private getResponseDataString(): string {
    const data = Array.from(this._responseData.entries())
      .filter(([key]) => key !== 'vnp_SecureHashType' && key !== 'vnp_SecureHash')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return data;
  }

  validateSignature(inputHash: string, secretKey: string): boolean {
    const rspRaw = this.getResponseDataString();
    const myChecksum = this.hmacSHA512(secretKey, rspRaw);
    return myChecksum === inputHash;
  }
}
