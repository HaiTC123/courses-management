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
import { EnrollmentDto, EnrollmentDetailDto } from 'src/model/dto/errollment.dto';
import { EnrollmentDetail, EnrollmentEntity } from 'src/model/entity/enrollment.entity';
import { CourseCompletionEntity } from 'src/model/entity/course-complete.entity';
import { CourseCompletionDto } from 'src/model/dto/course-complete.dto';
import { LearningPathCourseEntity, LearningPathEntity } from 'src/model/entity/learn.entity';
import { LearningPathCourseDto, LearningPathDto } from 'src/model/dto/learn.dto';
import { NotificationDto } from 'src/model/dto/notification.dto';
import { Notification } from 'src/model/entity/notification.entity';
import { AcademicAdvisingDto, AdvisingChatDto, FailedCourseDto, GoalDto, GradeDto } from 'src/model/dto/grade.dto';
import { AcademicAdvisingEntity, AdvisingChatEntity, FailedCourseEntity, GoalEntity, GradeEntity } from 'src/model/entity/grade.entity';
import { CoinEntity } from 'src/model/entity/coin.entity';
import { CoinDto } from 'src/model/dto/coin.dto';
import { TransactionHistoryDto } from 'src/model/dto/transactionHistory.dto';
import { TransactionHistoryEntity } from 'src/model/entity/transactionHistory.entity';
import { ProgressDto } from 'src/model/dto/progress.dto';
import { ProgressEntity } from 'src/model/entity/progress.entity';
import { CategoryDocumentDto } from 'src/model/dto/categoryDocument.dto';
import { CategoryDocumentEntity } from 'src/model/entity/categoryDocument.entity';
import { DocumentEntity } from 'src/model/entity/document.entity';
import { DocumentDto } from 'src/model/dto/document.dto';
import { JobConfigEntity } from 'src/model/entity/jobconfig.entity';
import { JobConfigDto } from 'src/model/dto/jobconfig.dto';
import { QuestionDto, QuestionStudentDto } from 'src/model/dto/question.dto';
import { QuestionEntity } from 'src/model/entity/question.entity';
import { ExamDto } from 'src/model/dto/exam.dto';
import { ExamEntity } from 'src/model/entity/exam.entity';
import { ExamResultEntity } from 'src/model/entity/examResult.entity';
import { ExamResultDto } from 'src/model/dto/examResult.dto';
import { CertificateEntity } from 'src/model/entity/certificate.entity';
import { CertificateDto } from 'src/model/dto/certificate.dto';

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
    createMap(this.mapper, UserEntity, UserDto,
      forMember((dest) => dest.accountStatus, mapFrom((src) => src.accountStatus)),
      forMember((dest) => dest.gender, mapFrom((src) => src.gender))

    );
    createMap(this.mapper, UserDto, UserEntity);
    createMap(this.mapper, StudentDto, StudentEntity,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))
    );
    createMap(this.mapper, StudentEntity, StudentDto,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))

    );

    createMap(this.mapper, InstructorDto, InstructorEntity,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId))
    );
    createMap(this.mapper, InstructorEntity, InstructorDto,
      forMember((dest) => dest.id, mapFrom((src) => src.id)),
      forMember((dest) => dest.userId, mapFrom((src) => src.userId)),
      forMember((dest) => dest.user, mapFrom((src) => src.user))

    );

    // Map cho Course
    createMap(this.mapper, CourseEntity, CourseDto,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.credits, mapFrom(src => src.credits)),
      forMember(dest => dest.instructorId, mapFrom(src => src.instructorId)),
      forMember(dest => dest.enrollment, mapFrom(src => src.enrollment)),
      forMember(dest => dest.instructor, mapFrom(src => src.instructor)),
      forMember(dest => dest.status, mapFrom(src => src.status)),
      
    )
      ;

    createMap(this.mapper, CourseDto, CourseEntity,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.credits, mapFrom(src => src.credits)),
      forMember(dest => dest.instructorId, mapFrom(src => src.instructorId)),
      forMember(dest => dest.status, mapFrom(src => src.status))
    );

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
      ),
      forMember(
        (destination) => destination.course,
        mapFrom((source) => source.course)
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
      )
    );

    createMap(this.mapper, EnrollmentDetail, EnrollmentDetailDto,
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
        (destination) => destination.course,
        mapFrom((source) => source.course)
      ),
      forMember(
        (destination) => destination.student,
        mapFrom((source) => source.student)
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
      ),
      forMember(
        (dest) => dest.id,
        mapFrom((src) => src.id)
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
    createMap(this.mapper, CoinEntity, CoinDto,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => src.id)
      ),
      forMember(
        (dest) => dest.amount,
        mapFrom((src) => src.amount)
      ),
      forMember(
        (dest) => dest.userId,
        mapFrom((src) => src.userId)
      )
    );

    createMap(this.mapper, CoinDto, CoinEntity,
      forMember((dest) => dest.user, mapFrom((src) => src.user))
    );
    createMap(this.mapper, TransactionHistoryDto, TransactionHistoryEntity);
    createMap(this.mapper, TransactionHistoryEntity, TransactionHistoryDto);
    createMap(this.mapper, ProgressDto, ProgressEntity);
    createMap(this.mapper, ProgressEntity, ProgressDto,
      forMember((dest) => dest.enrollment, mapFrom((src) => src.enrollment)),
      forMember((dest) => dest.material, mapFrom((src) => src.material)),
      forMember((dest) => dest.status, mapFrom((src) => src.status))
    );
    createMap(this.mapper, AdvisingChatDto, AdvisingChatEntity);
    createMap(this.mapper, AdvisingChatEntity, AdvisingChatDto,
      forMember((dest) => dest.sender, mapFrom((src) => src.sender))
    );
    createMap(this.mapper, CategoryDocumentDto, CategoryDocumentEntity);
    createMap(this.mapper, CategoryDocumentEntity, CategoryDocumentDto);
    createMap(this.mapper, DocumentEntity, DocumentDto,
      forMember((dest) => dest.category, mapFrom((src) => src.category))
    );
    createMap(this.mapper, DocumentDto, DocumentEntity);
    createMap(this.mapper, JobConfigEntity, JobConfigDto);
    createMap(this.mapper, JobConfigDto, JobConfigEntity);
    createMap(this.mapper, QuestionDto, QuestionEntity);
    createMap(this.mapper, QuestionEntity, QuestionDto);
    createMap(this.mapper, QuestionEntity, QuestionStudentDto,
      forMember((dest) => dest.options, mapFrom((src) => src.options))

    );
    createMap(this.mapper, ExamDto, ExamEntity);
    createMap(this.mapper, ExamEntity, ExamDto,
      forMember((dest) => dest.status, mapFrom((src) => src.status)),
      forMember((dest) => dest.questions, mapFrom((src) => src.questions))
    );
    createMap(this.mapper, ExamResultEntity, ExamResultDto,
      forMember((dest) => dest.student, mapFrom((src) => src.student)),
      forMember((dest) => dest.exam, mapFrom((src) => src.exam)),
      forMember((dest) => dest.createdAt, mapFrom((src) => src.createdAt))
    );
    createMap(this.mapper, ExamResultDto, ExamResultEntity);
    createMap(this.mapper, CertificateEntity, CertificateDto,
      forMember((dest) => dest.createdAt, mapFrom((src) => src.createdAt))
    );
    createMap(this.mapper, CertificateDto, CertificateEntity);
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



