import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { UserEntity } from 'src/model/entity/user.entity';
import { PrismaService } from 'src/repo/prisma.service';
@Injectable()
export class UsersService extends BaseService<UserEntity, Prisma.UserCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
}
