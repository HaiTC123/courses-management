import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/core/roles.guard';
import { InstructorEntity } from 'src/model/entity/instructor.enity';
import { InstructorDto } from 'src/model/dto/instructor.dto';
import { PrerequisitesService } from './prerequistite.service';
import { PrerequisiteEntity } from 'src/model/entity/prere.entity';

@ApiTags('Instructor')
@Controller('api/instructor')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Instructor)
export class PrerequisitesController extends BaseController<PrerequisiteEntity, Prisma.PrerequisiteCreateInput> {
    @EntityType(InstructorEntity)
    entity: InstructorEntity;

    @ModelType(InstructorDto)
    model: InstructorDto;
    constructor(private service:PrerequisitesService, coreSevice: CoreService){
        super("prerequisite",coreSevice,service);
    }

    @Post("test")
    @ApiBody({type: InstructorDto})
    async apiTest(@Body() param: InstructorDto){
        return null;
    }

}
