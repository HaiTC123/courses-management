import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { AcademicAdvisingsService } from './academicAdvising.service';
import { AcademicAdvisingEntity } from 'src/model/entity/grade.entity';
import { AcademicAdvisingDto } from 'src/model/dto/grade.dto';


@ApiTags('AcademicAdvisings')
@Controller('api/academicAdvising')
@UseGuards(AuthGuard)
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

}
