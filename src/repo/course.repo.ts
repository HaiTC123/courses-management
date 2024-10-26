// user/user.repository.ts
import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repo';
import { CourseEntity } from 'src/model/entity/course.entity';

export class CourseRepository extends BaseRepository<CourseEntity, Prisma.CourseCreateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.course); 
  }

}
