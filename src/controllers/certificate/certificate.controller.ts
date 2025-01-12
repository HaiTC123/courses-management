import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CertificateService } from './certificate.service';
import { CertificateEntity } from 'src/model/entity/certificate.entity';
import { CertificateDto } from 'src/model/dto/certificate.dto';


@ApiTags('Certificate')
@Controller('api/certificate')
@UseGuards(AuthGuard)
export class CertificateController extends BaseController<CertificateEntity, Prisma.CertificateCreateInput> {
    @EntityType(CertificateEntity)
    entity: CertificateEntity;

    @ModelType(CertificateDto)
    model: CertificateDto;
    constructor(private service: CertificateService, coreSevice: CoreService) {
        super("certificate", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CertificateDto })
    async apiTest(@Body() param: CertificateDto) {
        return null;
    }

}
