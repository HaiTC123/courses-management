import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { RolesGuard } from 'src/core/roles.guard';
import { ProgressEntity } from 'src/model/entity/progress.entity';
import { ProgressDto } from 'src/model/dto/progress.dto';
import { ProgressService } from './progress.service';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';

@ApiTags('Progress')
@Controller('api/progress')
@UseGuards(AuthGuard, RolesGuard)
export class ProgressController extends BaseController<ProgressEntity, Prisma.ProgressCreateInput> {
    @EntityType(ProgressEntity)
    entity: ProgressEntity;

    @ModelType(ProgressDto)
    model: ProgressDto;
    constructor(private service: ProgressService, coreSevice: CoreService) {
        super("progress", coreSevice, service);
    }

    @Roles(Role.Student)
    @Put("done/:materialId")
    async doneProgress(@Param("materialId")materialId: number): Promise<ServiceResponse> {
        return ServiceResponse.onSuccess(await this.service.doneProgress(materialId));
    }

    @Get(':courseId/progress')
    async getCourseProgress(
      @Param('courseId') courseId: number
    ) {

      return ServiceResponse.onSuccess(await this.service.getCourseProgress(courseId));
    }


}
