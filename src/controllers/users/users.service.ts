import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { hash } from 'bcrypt'
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { UserEntity } from 'src/model/entity/user.entity';
import { PrismaService } from 'src/repo/prisma.service';
import { generateRandomPassword, isEnvDevelopment } from 'src/utils/common.utils';

@Injectable()
export class UsersService extends BaseService<UserEntity, Prisma.UserCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
    //
    async add(entity: UserEntity): Promise<number> {
        let passWord = generateRandomPassword(10);
        if (isEnvDevelopment()) {
            passWord = "12345678";
        }
        entity.passwordHash = await hash(passWord, 10);
        entity.role = Role.Student;
        entity.inActive = false;
        entity.isBlock = false;
        var result = await this.repository.create(entity, {
            select: {
                id: true
            }
        }, this.getMoreCreateData());
        // to-do : send password to user email
        return Number(result.id);
    }

}
