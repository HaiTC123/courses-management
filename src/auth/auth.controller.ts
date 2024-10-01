import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.dto';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() body: RegisterDto): Promise<User>{
        return this.authService.register(body);
    }
}
