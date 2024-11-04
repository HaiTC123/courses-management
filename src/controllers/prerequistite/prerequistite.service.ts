import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { PrerequisiteEntity } from 'src/model/entity/prere.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class PrerequisitesService extends BaseService<PrerequisiteEntity, Prisma.PrerequisiteCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: PrerequisiteEntity): Promise<number> {
        var data = await this.prismaService.prereRepo.findUnique({
            courseId: entity.prerequisiteCourseId
        })

        if (!data && data.prerequisiteCourseId == entity.courseId) {
            throw new HttpException({ message: 'Invalid recycle prerequisite' }, HttpStatus.BAD_REQUEST)
        }
        return await super.add(entity);
    }
}
