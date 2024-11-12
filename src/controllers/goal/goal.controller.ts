import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { GoalsService } from './goal.service';
import { GoalEntity } from 'src/model/entity/grade.entity';
import { GoalDto } from 'src/model/dto/grade.dto';


@ApiTags('Goals')
@Controller('api/goals')
@UseGuards(AuthGuard)
export class GoalsController extends BaseController<GoalEntity, Prisma.GoalCreateInput> {
    @EntityType(GoalEntity)
    entity: GoalEntity;

    @ModelType(GoalDto)
    model: GoalDto;
    constructor(private service: GoalsService, coreSevice: CoreService) {
        super("goals", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: GoalDto })
    async apiTest(@Body() param: GoalDto) {
        return null;
    }

}
