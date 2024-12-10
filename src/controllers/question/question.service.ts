import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { AdvisingStatus, Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { NotificationType } from 'src/common/const/notification.type';
import { CoreService } from 'src/core/core.service';
import { QuestionEntity } from 'src/model/entity/question.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class QuestionService extends BaseService<QuestionEntity, Prisma.QuestionCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

}
