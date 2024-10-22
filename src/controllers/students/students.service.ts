import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { StudentEntity } from 'src/model/entity/student.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class StudentsService extends BaseService<StudentEntity, Prisma.StudentCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
    async add(entity: StudentEntity): Promise<number> {
        var user = await this.prismaService.userRepo.findOneWithCondition({
            userId: entity.userId
        })
        if (user) {
            throw new HttpException({ message: 'This user has been existed' }, HttpStatus.BAD_REQUEST)
        }
        return await super.add(entity);
    }


}
