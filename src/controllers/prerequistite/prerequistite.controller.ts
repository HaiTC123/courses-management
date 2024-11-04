import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { RolesGuard } from 'src/core/roles.guard';
import { PrerequisitesService } from './prerequistite.service';
import { PrerequisiteEntity } from 'src/model/entity/prere.entity';
import { PrerequisiteDto } from 'src/model/dto/prere.dto';

@ApiTags('Prerequisite')
@Controller('api/prerequisite')
@UseGuards(AuthGuard, RolesGuard)
export class PrerequisitesController extends BaseController<PrerequisiteEntity, Prisma.PrerequisiteCreateInput> {
    @EntityType(PrerequisiteEntity)
    entity: PrerequisiteEntity;

    @ModelType(PrerequisiteDto)
    model: PrerequisiteDto;
    constructor(private service:PrerequisitesService, coreSevice: CoreService){
        super("prerequisite",coreSevice,service);
    }

    @Post("test")
    @ApiBody({type: PrerequisiteDto})
    async apiTest(@Body() param: PrerequisiteDto){
        return null;
    }

}
