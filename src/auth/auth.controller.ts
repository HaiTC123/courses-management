import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { ServiceResponse } from 'src/model/response/service.response';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() body: RegisterDto): Promise<ServiceResponse>{
        return this.authService.register(body);
    }
}
