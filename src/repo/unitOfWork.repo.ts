// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OtpRequest, PrismaClient,Prisma } from '@prisma/client';
import { UserRepository } from './user.repo';
import { BaseRepository } from './base.repo';



@Injectable()
export class UnitOfWork extends PrismaClient implements OnModuleDestroy {
  public userRepo: UserRepository;
  public otpRepo: BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>;

  constructor() {
    super();
    this.userRepo = new UserRepository(this);
    this.otpRepo =  new BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>(this, this.otpRequest);
  }

  // Đóng kết nối Prisma khi module bị hủy
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
