import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { InstructorEntity } from 'src/model/entity/instructor.enity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class InstructorsService extends BaseService<InstructorEntity, Prisma.InstructorCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: InstructorEntity): Promise<number> {
        var user = await this.prismaService.userRepo.findOneWithCondition({
            id: entity.userId
        })
        if (!user) {
            throw new HttpException({ message: 'This user has been not existed' }, HttpStatus.BAD_REQUEST)
        }
        return await super.add(entity);
    }

}
