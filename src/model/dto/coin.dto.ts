import { BaseDto } from "./base.dto";
import { UserDto } from "./user.dto";

export class CoinDto extends BaseDto{
    id: number;
    amount: number;
    userId: number;
    user?: UserDto
}
