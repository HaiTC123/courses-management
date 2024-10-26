// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OtpRequest, PrismaClient, Prisma } from '@prisma/client';
import { UserRepository } from './user.repo';
import { BaseRepository } from './base.repo';
import { CourseRepository } from './course.repo';



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  public userRepo: UserRepository;
  public otpRepo: BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>;
  public courseRepo: CourseRepository;

  constructor() {
    super();
    this.userRepo = new UserRepository(this);
    this.otpRepo = new BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>(this, this.otpRequest);
    this.courseRepo = new CourseRepository(this);
  }

  // Đóng kết nối Prisma khi module bị hủy
  async onModuleDestroy() {
    await this.$disconnect();
  }

  createRepo<T extends { id: number }, K>(model: any): BaseRepository<T, K> {
    return new BaseRepository<T, K>(this, model);
  }

  getModelByType<T>(type: string): any {
    switch (type) {
      case "users":
        return this.user;
      case "optRequest":
        return this.otpRequest;
      case "students":
        return this.student;
      case "admins":
        return this.admin;
      case "instructors":
        return this.instructor;
      case "courses":
        return this.course;
      case "courseChapters":
        return this.courseChapter;
      case "courseLessons":
        return this.courseLesson;
      case "courseMaterials":
        return this.courseMaterial;  
    }
    return null;
  }

}
