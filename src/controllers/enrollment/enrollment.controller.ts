import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { RolesGuard } from 'src/core/roles.guard';
import { EnrollmentEntity } from 'src/model/entity/enrollment.entity';
import { ErrollmentsService } from './enrollment.service';
import { EnrollmentDto } from 'src/model/dto/errollment.dto';

@ApiTags('Enrollment')
@Controller('api/enrollment')
@UseGuards(AuthGuard, RolesGuard)

export class ErrollmentsController extends BaseController<EnrollmentEntity, Prisma.EnrollmentCreateInput> {
    @EntityType(EnrollmentEntity)
    entity: EnrollmentEntity;

    @ModelType(EnrollmentDto)
    model: EnrollmentDto;
    constructor(private service: ErrollmentsService, coreSevice: CoreService) {
        super("enrollments", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: EnrollmentDto })
    async apiTest(@Body() param: EnrollmentDto) {
        return null;
    }

}
