import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnitOfWork } from 'src/repo/unitOfWork.repo';
@Module({
  controllers: [AuthController],
  providers: [AuthService, UnitOfWork]
})
export class AuthModule {}
