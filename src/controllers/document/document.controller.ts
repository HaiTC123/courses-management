import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import {  DocumentService } from './document.service';
import { DocumentEntity } from 'src/model/entity/document.entity';
import { DocumentDto } from 'src/model/dto/document.dto';


@ApiTags('Document')
@Controller('api/document')
@UseGuards(AuthGuard)
export class DocumentController extends BaseController<DocumentEntity, Prisma.DocumentCreateInput> {
    @EntityType(DocumentEntity)
    entity: DocumentEntity;

    @ModelType(DocumentDto)
    model: DocumentDto;
    constructor(private service: DocumentService, coreSevice: CoreService) {
        super("document", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: DocumentDto })
    async apiTest(@Body() param: DocumentDto) {
        return null;
    }

}
