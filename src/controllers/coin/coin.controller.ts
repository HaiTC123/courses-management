import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CoinsService } from './coin.service';
import { GoalDto } from 'src/model/dto/grade.dto';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { CoinDto } from 'src/model/dto/coin.dto';
import { ServiceResponse } from 'src/model/response/service.response';
import { DepositCoinRequest } from 'src/model/request/depositCoint.request';
import { Response } from 'express';
import { Public } from 'src/utils/public.decorator';

@ApiTags('Coins')
@Controller('api/coins')
@UseGuards(AuthGuard)
export class CoinsController extends BaseController<CoinEntity, Prisma.CoinCreateInput> {
    @EntityType(CoinEntity)
    entity: CoinEntity;

    @ModelType(CoinDto)
    model: CoinDto;
    constructor(private service: CoinsService, coreSevice: CoreService) {
        super("coin", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: GoalDto })
    async apiTest(@Body() param: GoalDto) {
        return null;
    }

    @Get()
    async getCoin(){
        return ServiceResponse.onSuccess(await this.service.getCoinByUserId())
    }

    @Post("deposit")
    async depositCoin(@Body() param: DepositCoinRequest){
        return ServiceResponse.onSuccess(await this.service.depositCoin(param));
    }

    @Public()
    @Get("cancelurl")
    async cancelurl(@Query() query: any, @Res()res: Response){
        let link = '';
        if (Object.keys(query).length){
            link = await this.service.processCancelURL(query);
        }
        return res.redirect(link);
    }

    @Public()
    @Get("returnurl")
    async return(@Query() query: any, @Res()res: Response){
        let link = '';
        console.log("returnurl")
        if (Object.keys(query).length){
            link = await this.service.processReturnURL(query);
        }
        return res.redirect(link);
    }
}
