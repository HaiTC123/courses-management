import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as querystring from 'qs';

@Injectable()
export class VNPayLib {
  private _requestData: Map<string, string> = new Map();
  private _responseData: Map<string, string> = new Map();

  addRequestData(key: string, value: string): void {
    if (value) {
      this._requestData.set(key, value);
    }
  }

  getObjectRequestData(){
    return Object.fromEntries(this._requestData);
  }

  getSortObjectRequest(){
    const obj = this.getObjectRequestData();
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
  }

  addResponseData(key: string, value: string): void {
    if (value) {
      this._responseData.set(key, value);
    }
  }

  createRequestUrl(baseUrl: string, vnp_HashSecret: string): string {

    const sortedParams = this.getSortObjectRequest();
    
    // const data = sortedData
    //   .map(([key, value]) => `${key}=${value}`)
    //   .join('&');

    //const signData = data.length > 0 ? data.slice(0, -1) : data;
    const signData = querystring.stringify(sortedParams, { encode: false });
    const vnp_SecureHash = this.hmacSHA512(vnp_HashSecret, signData);
    this.addRequestData('vnp_SecureHash',vnp_SecureHash);
    //return `${baseUrl}?${data}&vnp_SecureHash=${vnp_SecureHash}`;
    return `${baseUrl}?${querystring.stringify( this.getSortObjectRequest(), { encode: true })}`;
  }

  private hmacSHA512(key: string, inputData: string): string {
    var hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(inputData, 'utf-8')).digest("hex"); 
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
