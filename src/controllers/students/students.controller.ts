import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { StudentDto } from 'src/model/dto/student.dto';
import { StudentEntity } from 'src/model/entity/student.entity';
import { StudentsService } from './students.service';
import { CoreService } from 'src/core/core.service';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/core/roles.guard';

@ApiTags('Student')
@Controller('api/student')
@UseGuards(AuthGuard, RolesGuard)
export class StudentsController extends BaseController<StudentEntity, Prisma.StudentCreateInput> {
    @EntityType(StudentEntity)
    entity: StudentEntity;

    @ModelType(StudentDto)
    model: StudentDto;
    constructor(private studentsevice:StudentsService, coreSevice: CoreService){
        super("students",coreSevice,studentsevice);
    }

    @Post("test")
    @ApiBody({type: StudentDto})
    async apiTest(@Body() param: StudentDto){
        return null;
    }

}
