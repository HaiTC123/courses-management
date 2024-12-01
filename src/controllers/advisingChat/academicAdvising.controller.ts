import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { AdvisingChatService } from './academicAdvising.service';
import { AdvisingChatEntity } from 'src/model/entity/grade.entity';
import { AcademicAdvisingDto, AdvisingChatDto } from 'src/model/dto/grade.dto';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';
import { RolesGuard } from 'src/core/roles.guard';


@ApiTags('AdvisingsChat')
@Controller('api/advisingChat')
@UseGuards(AuthGuard, RolesGuard)
export class ChatadvisingChatController extends BaseController<AdvisingChatEntity, Prisma.AdvisingChatCreateInput> {
    @EntityType(AdvisingChatEntity)
    entity: AdvisingChatEntity;

    @ModelType(AdvisingChatDto)
    model: AdvisingChatDto;
    constructor(private service: AdvisingChatService, coreSevice: CoreService) {
        super("advisingChat", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: AdvisingChatDto })
    async apiTest(@Body() param: AdvisingChatDto) {
        return null;
    }

    @Roles(Role.Student)
    @Post("student")
    async studentSend(@Body() param: AdvisingChatDto){
        return ServiceResponse.onSuccess(await this.service.studentSend(param));
    }


    @Roles(Role.Instructor)
    @Post("advisor")
    async advisorSend(@Body() param: AdvisingChatDto){
        return ServiceResponse.onSuccess(await this.service.advisorSend(param));
    }

}
