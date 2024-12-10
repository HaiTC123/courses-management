import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { QuestionService } from './question.service';
import { AcademicAdvisingDto, AdvisingChatDto } from 'src/model/dto/grade.dto';
import { RolesGuard } from 'src/core/roles.guard';
import { QuestionEntity } from 'src/model/entity/question.entity';
import { QuestionDto } from 'src/model/dto/question.dto';


@ApiTags('Question')
@Controller('api/question')
@UseGuards(AuthGuard, RolesGuard)
export class QuestionController extends BaseController<QuestionEntity, Prisma.QuestionCreateInput> {
    @EntityType(QuestionEntity)
    entity: QuestionEntity;

    @ModelType(QuestionDto)
    model: QuestionDto;
    constructor(private service: QuestionService, coreSevice: CoreService) {
        super("question", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: QuestionDto })
    async apiTest(@Body() param: QuestionDto) {
        return null;
    }
}
