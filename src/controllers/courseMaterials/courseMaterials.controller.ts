import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { CourseMaterialEntity } from 'src/model/entity/course.entity';
import { CourseMaterialsService } from './courseMaterials.service';
import { CourseMaterialDto } from 'src/model/dto/course.dto';


@ApiTags('CourseMaterials')
@Controller('api/courseMaterials')
@UseGuards(AuthGuard)
export class CourseLessonsController extends BaseController<CourseMaterialEntity, Prisma.CourseMaterialCreateInput> {
    @EntityType(CourseMaterialEntity)
    entity: CourseMaterialEntity;

    @ModelType(CourseMaterialDto)
    model: CourseMaterialDto;
    constructor(private service: CourseMaterialsService, coreSevice: CoreService) {
        super("courseMaterials", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CourseMaterialDto })
    async apiTest(@Body() param: CourseMaterialDto) {
        return null;
    }

}
