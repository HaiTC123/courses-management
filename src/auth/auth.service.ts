import { CoreService } from './../core/core.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.dto';
import { hash } from 'bcrypt'
import { Prisma, Role, Gender, AccountStatus, User } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { UnitOfWork } from 'src/repo/unitOfWork.repo';
@Injectable()
export class AuthService extends BaseService{

    constructor(coreService: CoreService , private readonly unitOfWork: UnitOfWork){
        super(coreService)
    }
    register = async (userData: RegisterDto): Promise<User> => {
        const user = await this.unitOfWork.userRepo.findByEmail(userData.email)
        if (user){
            throw new HttpException({message: 'This email has been used'}, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await hash(userData.password, 10);
        const userCreate = this.mapper.mapRegisterDtoToUser(userData);
        userCreate.passwordHash = hashPassword;
        userCreate.isBlock = false;
        userCreate.inActive = false;
        const res = await this.unitOfWork.userRepo.create(userCreate)
        return res
    }
}
