import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { GradesService } from './grade.service';
import { CourseMaterialDto } from 'src/model/dto/course.dto';
import { GradeEntity } from 'src/model/entity/grade.entity';
import { GradeDto } from 'src/model/dto/grade.dto';


@ApiTags('Grades')
@Controller('api/grades')
@UseGuards(AuthGuard)
export class GradesController extends BaseController<GradeEntity, Prisma.GradeCreateInput> {
    @EntityType(GradeEntity)
    entity: GradeEntity;

    @ModelType(GradeDto)
    model: GradeDto;
    constructor(private service: GradesService, coreSevice: CoreService) {
        super("grades", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: GradeDto })
    async apiTest(@Body() param: GradeDto) {
        return null;
    }

}
