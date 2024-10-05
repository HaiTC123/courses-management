// core/repositories/base.repository.ts
import { PrismaClient, Prisma } from '@prisma/client';

export class BaseRepository<T extends { id: number }> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  // Lấy tất cả bản ghi
  async getAll(): Promise<T[]> {
    return this.model.findMany();
  }

  // Lấy bản ghi theo ID
  async getById(id: number): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  // Tạo mới bản ghi
  async create(data: Prisma.UserCreateInput): Promise<T> {
    return this.model.create({
      data,
    });
  }

  // Cập nhật bản ghi theo ID
  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  // Xóa bản ghi theo ID
  async delete(id: number): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }
}
