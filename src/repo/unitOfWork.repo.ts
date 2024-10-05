// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from './user.repo';

@Injectable()
export class UnitOfWork extends PrismaClient implements OnModuleDestroy {
  public userRepo: UserRepository;

  constructor() {
    super();
    this.userRepo = new UserRepository(this);
  }

  // Đóng kết nối Prisma khi module bị hủy
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
