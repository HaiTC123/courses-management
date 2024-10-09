// user/user.repository.ts
import { Prisma, PrismaClient, User } from '@prisma/client';
import { BaseRepository } from './base.repo';

export class UserRepository extends BaseRepository<User, Prisma.UserCreateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneByField("email", email);
  }
}
