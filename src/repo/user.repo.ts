// user/user.repository.ts
import { PrismaClient, User } from '@prisma/client';
import { BaseRepository } from './base.repo';

export class UserRepository extends BaseRepository<User> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneByField("email", email);
  }
}
