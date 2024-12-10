import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { SemesterService } from './semester.service';
import { SemesterEntity } from 'src/model/entity/semester.entity';
import { SemesterDto } from 'src/model/dto/semester.dto';


@ApiTags('Semester')
@Controller('api/semester')
@UseGuards(AuthGuard)
export class SemesterController extends BaseController<SemesterEntity, Prisma.SemesterCreateInput> {
    @EntityType(SemesterEntity)
    entity: SemesterEntity;

    @ModelType(SemesterDto)
    model: SemesterDto;
    constructor(private service: SemesterService, coreSevice: CoreService) {
        super("semester", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: SemesterDto })
    async apiTest(@Body() param: SemesterDto) {
        return null;
    }

}
