import { OtpRequest } from '@prisma/client';
import { Request } from 'express';
import { CoreService } from '../../core/core.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../model/dto/auth.dto';
import { hash, compare } from 'bcrypt'
import { BaseService } from 'src/base/base.service';
import { UnitOfWork } from 'src/repo/unitOfWork.repo';
import { UserEntity } from 'src/model/entity/user.entity';
import generateToken from 'src/utils/token.utils';
import { ServiceResponse } from 'src/model/response/service.response';
import { ChangePasswordRequest, ForgotPassswordRequest, LoginRequest, ResetPasswordRequest } from 'src/model/request/index';
import { generateOtp } from 'src/utils/common.utils';
import { OTPEntity } from 'src/model/entity/otp.enity';

@Injectable()
export class AuthService extends BaseService {
    private readonly tokenBlacklist: Set<string> = new Set(); // Set để lưu token bị blacklist
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
            throw new HttpException({ message: 'This email is not null' }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!userPayload.password) {
            throw new HttpException({ message: 'This password is not null' }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const user = await this.unitOfWork.userRepo.findUnique(
            {
                email: userPayload.email
            },
            {
                email: true,
                fullName: true,
                passwordHash: true,
                role: true,
                id: true
            }
        );

        if (!user) {
            throw new HttpException({ message: "Email or password is invalid" }, HttpStatus.UNAUTHORIZED);
        }

        const match = await compare(userPayload.password, user.passwordHash);
        if (!match) {
            throw new HttpException({ message: "Email or password is invalid" }, HttpStatus.UNAUTHORIZED);
        }
        // ingore generate
        user.passwordHash = "";
        return ServiceResponse.onSuccess({
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            id: user.id,
            token: generateToken(user)
        })

    };

    forgotPassword = async (param: ForgotPassswordRequest): Promise<ServiceResponse> => {

        if (!param.email) {
            throw new HttpException({ message: 'This email is not null' }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const user = await this.unitOfWork.userRepo.findByEmail(param.email);

        if (!user) {
            throw new HttpException({ message: "Email is invalid" }, HttpStatus.BAD_REQUEST);
        }
        var otpCode = generateOtp();
        var data = new OTPEntity();
        data.email = param.email;
        data.otp = otpCode;
        data.expiryTime = new Date(new Date().getTime() + 300000);
        await this.unitOfWork.otpRepo.create(data);
        // send email
        await this._emailService.sendEmail("phamngocthuan13@gmail.com", "Quên mật khẩu", "TemplateForgotPassword.html", {
            OTP: data.otp
        })
        return ServiceResponse.onSuccess();

    };

    resetPassword = async (param: ResetPasswordRequest): Promise<ServiceResponse> => {
        var otpRequest = await this.unitOfWork.otpRepo.findOneWithCondition({
            email: param.email,
            otp: param.Otp,
            expiryTime: {
                gt: new Date(),
            }
        })

        if (otpRequest == null) {
            return ServiceResponse.onBadRequest("Invalid OTP");
        }

        var user = await this.unitOfWork.userRepo.findByEmail(otpRequest.email);

        if (user == null) {
            return ServiceResponse.onBadRequest("User not found");
        }
        user.passwordHash = await hash(param.newPassword, 10);
        await this.unitOfWork.userRepo.update(user.id, user);
        await this.unitOfWork.otpRepo.delete(otpRequest.id);
        return ServiceResponse.onSuccess();
    }

    async changePassword(body: ChangePasswordRequest) {

        const userId = this._authService.getUserID();
        // Lấy thông tin người dùng từ database
        const user = await this.unitOfWork.userRepo.getById(userId);

        if (!user) {
            throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
        }

        // So sánh mật khẩu cũ
        const isMatch = await compare(body.password, user.passwordHash);
        if (!isMatch) {
            throw new HttpException({ message: 'Current password is incorrect' }, HttpStatus.BAD_REQUEST);
        }

        // Cập nhật mật khẩu mới
        const newPasswordHash = await hash(body.newPassword, 10);
        await this.unitOfWork.userRepo.update(userId, { passwordHash: newPasswordHash });

        return ServiceResponse.onSuccess("Done Update");
    }


    // Thêm token vào danh sách đen (token blacklist)
    addTokenToBlacklist(token: string) {
        // Thêm token vào blacklist
        const tokenWithoutBearer = token.replace('Bearer ', ''); // Loại bỏ 'Bearer ' khỏi token nếu có
        this.tokenBlacklist.add(tokenWithoutBearer);
    }

    // Kiểm tra xem token có trong danh sách đen không
    isTokenBlacklisted(token: string): boolean {
        return this.tokenBlacklist.has(token);
    }
}
