// core/services/unit-of-work.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OtpRequest, PrismaClient, Prisma } from '@prisma/client';
import { UserRepository } from './user.repo';
import { BaseRepository } from './base.repo';
import { CourseRepository } from './course.repo';
import { PrerequisiteEntity } from 'src/model/entity/prere.entity';
import { CourseCompletionEntity } from 'src/model/entity/course-complete.entity';



@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  public userRepo: UserRepository;
  public otpRepo: BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>;
  public courseRepo: CourseRepository;
  public prereRepo: BaseRepository<PrerequisiteEntity, Prisma.PrerequisiteCreateInput>;
  public courseCompleteRepo: BaseRepository<CourseCompletionEntity, Prisma.CourseCompletionCreateInput>;

  constructor() {
    super();
    this.userRepo = new UserRepository(this);
    this.otpRepo = new BaseRepository<OtpRequest, Prisma.OtpRequestCreateInput>(this, this.otpRequest);
    this.courseRepo = new CourseRepository(this);
    this.prereRepo = new BaseRepository<PrerequisiteEntity, Prisma.PrerequisiteCreateInput>(this, this.prerequisite);
    this.courseCompleteRepo = new BaseRepository<CourseCompletionEntity, Prisma.CourseCompletionCreateInput>(this, this.courseCompletion);
  }

  // Đóng kết nối Prisma khi module bị hủy
  async onModuleDestroy() {
    await this.$disconnect();
  }

  createRepo<T extends { id: number }, K>(modelName, model: any) {
    switch (modelName) {
      case "users":
        return this.userRepo;
      case "optRequest":
        return this.otpRepo;
      case "courses":
        return this.courseRepo;
      case "prerequisite":
        return this.prereRepo;
      case "courseCompletetion":
        return this.courseCompleteRepo;
    }
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
      case "file":
        return this.file;
      case "prerequisite":
        return this.prerequisite;
      case "semester":
        return this.semester;
      case "enrollments":
        return this.enrollment;
      case "learnPaths":
        return this.learningPath;
      case "learnPathCourse":
        return this.learningPathCourse;
    }
    return null;
  }

}
