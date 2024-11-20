import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
        
    }

}
