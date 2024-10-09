import { CoreService } from './../core/core.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.dto';
import { hash,compare } from 'bcrypt'
import { BaseService } from 'src/base/base.service';
import { UnitOfWork } from 'src/repo/unitOfWork.repo';
import { UserEntity } from 'src/model/entity/user.entity';
import generateToken from 'src/utils/token.utils';
import { RegisterResponse } from 'src/model/response/register.response';
import { LoginRequest } from 'src/model/request/login.request';
import { ServiceResponse } from 'src/model/response/service.response';
@Injectable()
export class AuthService extends BaseService {

    constructor(coreService: CoreService, private readonly unitOfWork: UnitOfWork) {
        super(coreService)
    }
    register = async (userData: RegisterDto): Promise<ServiceResponse> => {
        const user = await this.unitOfWork.userRepo.findByEmail(userData.email)
        if (user) {
            throw new HttpException({ message: 'This email has been used' }, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await hash(userData.password, 10);
        const userCreate = this._mapperService.mapData(userData, RegisterDto, UserEntity);
        userCreate.passwordHash = hashPassword;
        userCreate.isBlock = false;
        userCreate.inActive = false;
        userCreate.dateOfBirth = null;
        const result = await this.unitOfWork.userRepo.create(userCreate, {
            fullName: true,
            email: true,
            role: true,
            id: true
        });
        return ServiceResponse.onSuccess({
            ...result,
            token: generateToken(result)
        })
    }

    login = async (userPayload: LoginRequest): Promise<ServiceResponse> => {
        
        if (!userPayload.email) {
            throw new HttpException({ message: 'This email is not null'}, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!userPayload.password) {
            throw new HttpException({message: 'This password is not null'}, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const user = await this.unitOfWork.userRepo.findUnique(
            {
                email: userPayload.email
            },
            {
                email: true,
                fullName: true,
                password: true,
                role: true
            }
        );

        if (!user){
            throw new HttpException({message: "Email or password is invalie"}, HttpStatus.UNAUTHORIZED);
        }

        const match = await compare(userPayload.password, user.passwordHash);
        if (!match){
            throw new HttpException({message: "Email or password is invalie"}, HttpStatus.UNAUTHORIZED);
        }
        return ServiceResponse.onSuccess({
            email: user.email,
            fullName: user.fullName,
            token: generateToken(user)
        })
        
    };
}
