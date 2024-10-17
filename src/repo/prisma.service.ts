// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OtpRequest, PrismaClient,Prisma } from '@prisma/client';
import { UserRepository } from './user.repo';
import { BaseRepository } from './base.repo';



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
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

  createRepo<T extends { id: number }, K>(model: any): BaseRepository<T, K> {
    return new BaseRepository<T, K>(this, model);
  }

  getModelByType<T>(type: string): any{
    switch(type){
      case "users":
        return this.user;
      case "optRequest":
        return this.otpRequest;
    }
    return null;
  }

}
