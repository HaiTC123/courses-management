import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { InstructorsService } from './instructors.service';
import { CoreService } from 'src/core/core.service';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/core/roles.guard';
import { InstructorEntity } from 'src/model/entity/instructor.enity';
import { InstructorDto } from 'src/model/dto/instructor.dto';

@ApiTags('Instructor')
@Controller('api/instructor')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Instructor, Role.Student)
export class InstructorsController extends BaseController<InstructorEntity, Prisma.InstructorCreateInput> {
    @EntityType(InstructorEntity)
    entity: InstructorEntity;

    @ModelType(InstructorDto)
    model: InstructorDto;
    constructor(private service:InstructorsService, coreSevice: CoreService){
        super("instructors",coreSevice,service);
    }

    @Post("test")
    @ApiBody({type: InstructorDto})
    async apiTest(@Body() param: InstructorDto){
        return null;
    }

}
