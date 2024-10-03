import { CoreService } from './../core/core.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dtos/auth.dto';
import { hash } from 'bcrypt'
import { Prisma, Role, Gender, AccountStatus, User } from '@prisma/client';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class AuthService extends BaseService{

    constructor(coreService: CoreService ,private prismaService: PrismaService){
        super(coreService)
    }
    register = async (userData: RegisterDto): Promise<User> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userData.email
            }
        })
        if (user){
            throw new HttpException({message: 'This email has been used'}, HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await hash(userData.password, 10);

        this.ma
        const data: Prisma.UserCreateInput = {
            fullName: "1",
            email: userData.email,
            passwordHash: hashPassword,
            role: Role.Student, // Đảm bảo `userData` có trường `role` nếu cần
            gender: Gender.Female, // Nếu bạn có các trường khác như `gender`, đảm bảo chúng khớp với Prisma schema
            dateOfBirth: null, // Cần truyền đúng định dạng
            phoneNumber: "2134567890",
            addressLine1: "Hà Nội",
            addressLine2: "Thái Bình",
            city: "Hà Nội",
            state: AccountStatus.Active,
            postalCode: "1000",
            country: "Việt Nam",
            profilePictureURL: "https://avatar-image"
        };
        const res = await this.prismaService.user.create({
            data: {
                fullName: "1",
                email: userData.email,
                passwordHash: hashPassword,
                role: Role.Student, // Đảm bảo `userData` có trường `role` nếu cần
                gender: Gender.Female, // Nếu bạn có các trường khác như `gender`, đảm bảo chúng khớp với Prisma schema
                dateOfBirth: null, // Cần truyền đúng định dạng
                phoneNumber: "2134567890",
                addressLine1: "Hà Nội",
                addressLine2: "Thái Bình",
                city: "Hà Nội",
                state: AccountStatus.Active,
                postalCode: "1000",
                country: "Việt Nam",
                profilePictureURL: "https://avatar-image"
            }
        })
        return res
    }
}
