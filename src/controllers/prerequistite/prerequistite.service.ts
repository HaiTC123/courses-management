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
        var data = await this.prismaService.prereRepo.findByField("courseId", entity.prerequisiteCourseId)

        if (!data || data.find(x => x.prerequisiteCourseId == entity.courseId)) {
            throw new HttpException({ message: 'Invalid recycle prerequisite' }, HttpStatus.BAD_REQUEST)
        }

        var data1 = await this.prismaService.prereRepo.findOneByFieldList({

            courseId: entity.courseId,
            prerequisiteCourseId: entity.prerequisiteCourseId
        })
        if (data1) {
            return data1.id;
        }
        return await super.add(entity);
    }
}
