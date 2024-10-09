// auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { validateToken } from 'src/utils/token.utils';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader  = request.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException({mesagge: "Token is missing"}, HttpStatus.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1];

    const userInfo = validateToken(token);
    if (!userInfo){
      throw new HttpException({mesagge: "Invalid or expired token"}, HttpStatus.UNAUTHORIZED)
    }

    // request.user = user;
    return true;

  }
}
