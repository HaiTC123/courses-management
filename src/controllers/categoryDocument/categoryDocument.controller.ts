import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import {  CategoryDocumentService } from './categoryDocument.service';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';
import { RolesGuard } from 'src/core/roles.guard';
import { CategoryDocumentEntity } from 'src/model/entity/categoryDocument.entity';
import { CategoryDocumentDto } from 'src/model/dto/categoryDocument.dto';


@ApiTags('CategoryDocument')
@Controller('api/categoryDocument')
@UseGuards(AuthGuard)
export class CategoryDocumentController extends BaseController<CategoryDocumentEntity, Prisma.CategoryDocumentCreateInput> {
    @EntityType(CategoryDocumentEntity)
    entity: CategoryDocumentEntity;

    @ModelType(CategoryDocumentDto)
    model: CategoryDocumentDto;
    constructor(private service: CategoryDocumentService, coreSevice: CoreService) {
        super("categoryDocument", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: CategoryDocumentDto })
    async apiTest(@Body() param: CategoryDocumentDto) {
        return null;
    }

}
