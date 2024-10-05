// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UnitOfWorkService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super();
  }

  // Bắt đầu giao dịch
  async beginTransaction() {
    return this.$transaction(async (prisma) => {
      // Có thể thêm các hành động khởi tạo khác nếu cần
      return prisma;
    });
  }

  // Hoàn tất giao dịch
  async commit() {
    // Logic xử lý khi commit, nếu dùng Prisma thì tự quản lý commit bên trong transaction
  }

  // Rollback giao dịch nếu gặp lỗi
  async rollback() {
    // Logic xử lý khi rollback
  }

  // Đảm bảo đóng kết nối Prisma khi service bị hủy
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
