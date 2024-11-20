import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

export class CoinEntity extends BaseEntity{
    id: number;
    amount: number;
    userId: number;
    user?: UserEntity;
  }