import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { JobConfigService } from './jobConfig.service';
import { RolesGuard } from 'src/core/roles.guard';
import { JobConfigEntity } from 'src/model/entity/jobconfig.entity';
import { JobConfigDto } from 'src/model/dto/jobconfig.dto';


@ApiTags('JobConfig')
@Controller('api/jobconfig')
@UseGuards(AuthGuard, RolesGuard)
export class JobConfigController extends BaseController<JobConfigEntity, Prisma.JobConfigCreateInput> {
    @EntityType(JobConfigEntity)
    entity: JobConfigEntity;

    @ModelType(JobConfigDto)
    model: JobConfigDto;
    constructor(private service: JobConfigService, coreSevice: CoreService) {
        super("jobconfig", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: JobConfigDto })
    async apiTest(@Body() param: JobConfigDto) {
        return null;
    }

}
