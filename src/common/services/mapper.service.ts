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
import { UserDetail, UserDto } from 'src/model/dto/user.dto';
import { StudentDto } from 'src/model/dto/student.dto';
import { StudentEntity } from 'src/model/entity/student.entity';
import { InstructorDto } from 'src/model/dto/instructor.dto';
import { InstructorEntity } from 'src/model/entity/instructor.enity';
import { CourseChapterEntity, CourseEntity, CourseLessonEntity, CourseMaterialEntity } from 'src/model/entity/course.entity';
import { CourseChapterDto, CourseDto, CourseLessonDto, CourseMaterialDto } from 'src/model/dto/course.dto';
import { PrerequisiteEntity } from 'src/model/entity/prere.entity';
import { PrerequisiteDto } from 'src/model/dto/prere.dto';
import { SemesterEntity } from 'src/model/entity/semester.entity';
import { SemesterDto } from 'src/model/dto/semester.dto';
import { EnrollmentDto } from 'src/model/dto/errollment.dto';
import { EnrollmentEntity } from 'src/model/entity/enrollment.entity';
import { CourseCompletionEntity } from 'src/model/entity/course-complete.entity';
import { CourseCompletionDto } from 'src/model/dto/course-complete.dto';
import { LearningPathCourseEntity, LearningPathEntity } from 'src/model/entity/learn.entity';
import { LearningPathCourseDto, LearningPathDto } from 'src/model/dto/learn.dto';
import { NotificationDto } from 'src/model/dto/notification.dto';
import { Notification } from 'src/model/entity/notification.entity';
import { AcademicAdvisingDto, FailedCourseDto, GoalDto, GradeDto } from 'src/model/dto/grade.dto';
import { AcademicAdvisingEntity, FailedCourseEntity, GoalEntity, GradeEntity } from 'src/model/entity/grade.entity';

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
      forMember(dest => dest.instructorId, mapFrom(src => src.instructorId)),
      forMember(dest => dest.enrollment, mapFrom(src => src.enrollment)),
      forMember(dest => dest.instructor, mapFrom(src => src.instructor))
    )
      ;

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

    createMap(this.mapper, PrerequisiteEntity, PrerequisiteDto,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.courseId,
        mapFrom((source) => source.courseId)
      ),
      forMember(
        (destination) => destination.prerequisiteCourseId,
        mapFrom((source) => source.prerequisiteCourseId)
      ),
      forMember(
        (destination) => destination.prerequisiteCourse,
        mapFrom((source) => source.prerequisiteCourse)
      )
    )
    createMap(this.mapper, PrerequisiteDto, PrerequisiteEntity,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.courseId,
        mapFrom((source) => source.courseId)
      ),
      forMember(
        (destination) => destination.prerequisiteCourseId,
        mapFrom((source) => source.prerequisiteCourseId)
      )
    )

    createMap(this.mapper, SemesterEntity, SemesterDto,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.startDate,
        mapFrom((source) => source.startDate)
      ),
      forMember(
        (destination) => destination.endDate,
        mapFrom((source) => source.endDate)
      )
    )

    // Mapping từ DTO sang Entity
    createMap(this.mapper, SemesterDto, SemesterEntity,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.startDate,
        mapFrom((source) => source.startDate)
      ),
      forMember(
        (destination) => destination.endDate,
        mapFrom((source) => source.endDate)
      )
    )

    createMap(this.mapper, EnrollmentEntity, EnrollmentDto,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.studentId,
        mapFrom((source) => source.studentId)
      ),
      forMember(
        (destination) => destination.courseId,
        mapFrom((source) => source.courseId)
      ),
      forMember(
        (destination) => destination.semesterId,
        mapFrom((source) => source.semesterId)
      ),
      forMember(
        (destination) => destination.gradeDetail,
        mapFrom((source) => source.gradeDetail)
      )
    );

    // Mapping từ DTO sang Entity
    createMap(this.mapper, EnrollmentDto, EnrollmentEntity,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
      ),
      forMember(
        (destination) => destination.studentId,
        mapFrom((source) => source.studentId)
      ),
      forMember(
        (destination) => destination.courseId,
        mapFrom((source) => source.courseId)
      ),
      forMember(
        (destination) => destination.semesterId,
        mapFrom((source) => source.semesterId)
      )
    );
    createMap(
      this.mapper,
      CourseCompletionEntity,
      CourseCompletionDto,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => src.id)
      ),
      forMember(
        (dest) => dest.studentId,
        mapFrom((src) => src.studentId)
      ),
      forMember(
        (dest) => dest.courseId,
        mapFrom((src) => src.courseId)
      ),
      forMember(
        (dest) => dest.enrollmentId,
        mapFrom((src) => src.enrollmentId)
      ),
      forMember(
        (dest) => dest.semesterId,
        mapFrom((src) => src.semesterId)
      ),
      forMember(
        (dest) => dest.finalGrade,
        mapFrom((src) => src.finalGrade)
      )


    );

    createMap(
      this.mapper,
      CourseCompletionDto,
      CourseCompletionEntity,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => src.id)
      ),
      forMember(
        (dest) => dest.studentId,
        mapFrom((src) => src.studentId)
      ),
      forMember(
        (dest) => dest.courseId,
        mapFrom((src) => src.courseId)
      ),
      forMember(
        (dest) => dest.enrollmentId,
        mapFrom((src) => src.enrollmentId)
      ),
      forMember(
        (dest) => dest.semesterId,
        mapFrom((src) => src.semesterId)
      ),
      forMember(
        (dest) => dest.finalGrade,
        mapFrom((src) => src.finalGrade)
      )
    );
    createMap(this.mapper, UserEntity, UserDetail,
      forMember(
        (dest) => dest.student,
        mapFrom((src) => src.student)
      ),
      forMember(
        (dest) => dest.instructor,
        mapFrom((src) => src.instructor)
      ),
      forMember(
        (dest) => dest.admin,
        mapFrom((src) => src.admin)
      )

    );
    createMap(this.mapper, LearningPathEntity, LearningPathDto,
      forMember(
        (dest) => dest.courses,
        mapFrom((src) => src.courses)
      )
    );
    createMap(this.mapper, LearningPathDto, LearningPathEntity);

    createMap(this.mapper, LearningPathCourseEntity, LearningPathCourseDto,
      forMember(
        (dest) => dest.course,
        mapFrom((src) => src.course)
      )

    );
    createMap(this.mapper, LearningPathCourseDto, LearningPathCourseEntity);
    createMap(this.mapper, Notification, NotificationDto);
    createMap(this.mapper, NotificationDto, Notification);
    createMap(this.mapper, GradeEntity, GradeDto);
    createMap(this.mapper, FailedCourseEntity, FailedCourseDto);
    createMap(this.mapper, CourseCompletionEntity, CourseCompletionDto);
  
    createMap(this.mapper, GradeDto, GradeEntity);
    createMap(this.mapper, FailedCourseDto, FailedCourseEntity);
    createMap(this.mapper, CourseCompletionDto, CourseCompletionEntity);
    createMap(this.mapper, GoalEntity, GoalDto);
    createMap(this.mapper, GoalDto, GoalEntity);
  
    createMap(this.mapper, AcademicAdvisingEntity, AcademicAdvisingDto);
    createMap(this.mapper, AcademicAdvisingDto, AcademicAdvisingEntity);
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

