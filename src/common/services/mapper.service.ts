import { User } from '@prisma/client';
// user.profile.ts
import { createMap, forMember, ignore, mapFrom, createMapper } from '@automapper/core';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/model/entity/user.entity';
import { RegisterDto } from '../../model/dto/auth.dto';
import { Role } from '@prisma/client';
import { classes } from '@automapper/classes';
import { RegisterResponse } from 'src/model/response/register.response';
import { UserDto } from 'src/model/dto/user.dto';
import { StudentDto } from 'src/model/dto/student.dto';
import { StudentEntity } from 'src/model/entity/student.entity';
import { InstructorDto } from 'src/model/dto/instructor.dto';
import { InstructorEntity } from 'src/model/entity/instructor.enity';
import { CourseChapterEntity, CourseEntity, CourseLessonEntity, CourseMaterialEntity } from 'src/model/entity/course.entity';
import { CourseChapterDto, CourseDto, CourseLessonDto, CourseMaterialDto } from 'src/model/dto/course.dto';

@Injectable()
export class MapperService {
  private readonly mapper: Mapper;
  constructor() {
    // Khởi tạo mapper với chiến lược classes
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });

    // Cấu hình các map giữa các lớp
    this.initializeMappings();
  }

  private initializeMappings() {
    createMap(
      this.mapper,
      RegisterDto,
      UserEntity,
      forMember((dest) => dest.id, ignore()), // Bỏ qua id vì DTO không chứa id
      forMember((dest) => dest.passwordHash, ignore()), // Mã hóa mật khẩu sau
      forMember((dest) => dest.role, mapFrom(() => Role.Student)), // Gán mặc định vai trò
      forMember((dest) => dest.inActive, mapFrom(() => false)), // Gán giá trị mặc định cho inActive
      forMember((dest) => dest.isBlock, mapFrom(() => false)), // Gán giá trị mặc định cho isBlock
      forMember((dest) => dest.createdAt, mapFrom(() => new Date())), // Set thời gian hiện tại cho createdAt
      forMember((dest) => dest.updatedAt, mapFrom(() => new Date())) // Set thời gian hiện tại cho updatedAt
    );
    createMap(this.mapper, UserEntity, RegisterResponse);
    createMap(this.mapper, UserEntity, UserDto);
    createMap(this.mapper, UserDto, UserEntity);
    createMap(this.mapper, StudentDto, StudentEntity,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.yearOfStudy, mapFrom((src) => src.yearOfStudy)),
      forMember((dest) => dest.gpa, mapFrom((src) => src.gpa)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))
    );
    createMap(this.mapper, StudentEntity, StudentDto,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.yearOfStudy, mapFrom((src) => src.yearOfStudy)),
      forMember((dest) => dest.gpa, mapFrom((src) => src.gpa)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))

    );

    createMap(this.mapper, InstructorDto, InstructorEntity,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))
    );
    createMap(this.mapper, InstructorEntity, InstructorDto,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))

    );

    // Map cho Course
    createMap(this.mapper, CourseEntity, CourseDto,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.credits, mapFrom(src => src.credits)),
      forMember(dest => dest.instructorId, mapFrom(src => src.instructorId)));

    createMap(this.mapper, CourseDto, CourseEntity,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.credits, mapFrom(src => src.credits)),
      forMember(dest => dest.instructorId, mapFrom(src => src.instructorId)));

    // Map cho CourseChapter
    createMap(this.mapper, CourseChapterEntity, CourseChapterDto,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.courseId, mapFrom(src => src.courseId)));

    createMap(this.mapper, CourseChapterDto, CourseChapterEntity,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.courseId, mapFrom(src => src.courseId)));

    // Map cho CourseLesson
    createMap(this.mapper, CourseLessonEntity, CourseLessonDto,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.chapterId, mapFrom(src => src.chapterId)));

    createMap(this.mapper, CourseLessonDto, CourseLessonEntity,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.chapterId, mapFrom(src => src.chapterId)));

    // Map cho CourseMaterial
    createMap(this.mapper, CourseMaterialEntity, CourseMaterialDto,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.lessonId, mapFrom(src => src.lessonId)));

    createMap(this.mapper, CourseMaterialDto, CourseMaterialEntity,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.lessonId, mapFrom(src => src.lessonId)));

  }

  mapData<S, D>(source: S, sourceClass: new (...args: unknown[]) => S, destinationClass: new (...args: unknown[]) => D): D {
    return this.mapper.map(source, sourceClass, destinationClass);
  }

  mapListData<S, D>(source: S | S[], sourceClass: new (...args: unknown[]) => S, destinationClass: new (...args: unknown[]) => D): D | D[] {
    if (Array.isArray(source)) {
      return this.mapper.mapArray(source, sourceClass, destinationClass);
    }
    return null;
  }

}

