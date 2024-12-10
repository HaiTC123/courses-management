import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { ExamResultService } from './examResult.service';
import { RolesGuard } from 'src/core/roles.guard';
import { ExamResultEntity } from 'src/model/entity/examResult.entity';
import { ExamResultDto } from 'src/model/dto/examResult.dto';


@ApiTags('ExamResult')
@Controller('api/examResult')
@UseGuards(AuthGuard, RolesGuard)
export class ExamResultController extends BaseController<ExamResultEntity, Prisma.ExamResultCreateInput> {
    @EntityType(ExamResultEntity)
    entity: ExamResultEntity;

    @ModelType(ExamResultDto)
    model: ExamResultDto;
    constructor(private service: ExamResultService, coreSevice: CoreService) {
        super("examResult", coreSevice, service);
    }


}
