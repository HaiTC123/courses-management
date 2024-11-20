import { IsInt, IsOptional, Min } from 'class-validator';

export class DepositCoinRequest {
  @IsInt()
  @Min(10000, { message: 'Số lượng coin hợp lệ' })
  numberCoin: number;

  @IsOptional()
  lang: string = 'vn';

  @IsOptional()
  bankCode?: string;
}
