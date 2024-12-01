import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { AcademicAdvisingsService } from './academicAdvising.service';
import { AcademicAdvisingEntity } from 'src/model/entity/grade.entity';
import { AcademicAdvisingDto } from 'src/model/dto/grade.dto';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';
import { RolesGuard } from 'src/core/roles.guard';


@ApiTags('AcademicAdvisings')
@Controller('api/academicAdvising')
@UseGuards(AuthGuard, RolesGuard)
export class AcademicAdvisingsController extends BaseController<AcademicAdvisingEntity, Prisma.AcademicAdvisingCreateInput> {
    @EntityType(AcademicAdvisingEntity)
    entity: AcademicAdvisingEntity;

    @ModelType(AcademicAdvisingDto)
    model: AcademicAdvisingDto;
    constructor(private service: AcademicAdvisingsService, coreSevice: CoreService) {
        super("academicAdvising", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: AcademicAdvisingDto })
    async apiTest(@Body() param: AcademicAdvisingDto) {
        return null;
    }

    @Roles(Role.Instructor)
    @Put("advisor/approved/:id")
    async advisorApproved(@Param('id') id: number){
        return ServiceResponse.onSuccess(await this.service.advisorUpdateStatus(id, AdvisingStatus.Approved));
    }

    @Roles(Role.Instructor)
    @Put("advisor/cancel/:id")
    async advisorCancel(@Param('id') id: number){
        return ServiceResponse.onSuccess(await this.service.advisorUpdateStatus(id, AdvisingStatus.Cancelled));
    }

    @Roles(Role.Instructor)
    @Put("advisor/done/:id")
    async advisorDone(@Param('id') id: number){
        return ServiceResponse.onSuccess(await this.service.advisorUpdateStatus(id, AdvisingStatus.Completed));
    }

    @Roles(Role.Student)
    @Put("student/cancel/:id")
    async studentCancel(@Param('id') id: number){
        return ServiceResponse.onSuccess(await this.service.advisorUpdateStatus(id, AdvisingStatus.Cancelled));
    }
}
