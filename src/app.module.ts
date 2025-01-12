import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { UsersModule } from './controllers/users/users.module';
import { CoreModule } from './core/core.module';
import { HttpContextInterceptor } from './common/interceptors/http-context.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StudentsModule } from './controllers/students/students.module';
import { InstructorsModule } from './controllers/instructors/instructors.module';
import { CoursesModule } from './controllers/courses/courses.module';
import { CourseChaptersModule } from './controllers/courseChapters/courseChapters.module';
import { CourseLessonsModule } from './controllers/courseLessons/courseLessons.module';
import { CourseMaterialsModule } from './controllers/courseMaterials/courseMaterials.module';
import { FilesModule } from './controllers/file/files.module';
import { PrerequisitesModule } from './controllers/prerequistite/prerequistite.module';
import { ErrollmentsModule } from './controllers/enrollment/enrollment.module';
import { LearnPathsModule } from './controllers/learn/learnPaths.module';
import { LearnPathCoursesModule } from './controllers/learnCourse/learnPathCourses.module';
import { GradesModule } from './controllers/grade/grade.module';
import { CompleteCoursesModule } from './controllers/completeCourse/completeCourse.module';
import { GoalsModule } from './controllers/goal/goal.module';
import { AcademicAdvisingsModule } from './controllers/academicAdvising/academicAdvising.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerModule } from './common/services/worker/worker.module';
// import { VNPayModule } from './common/services/vnpay/VNPay.module';
import { CoinsModule } from './controllers/coin/coin.module';
import { TransactionHistoryModule } from './controllers/transactionHistory/transactionHistory.module';
import { ProgressModule } from './controllers/progress/prerequistite.module';
import { AdvisingChatModule } from './controllers/advisingChat/academicAdvising.module';
import { CategoryDocumentModule } from './controllers/categoryDocument/categoryDocument.module';
import { DocumentModule } from './controllers/document/document.module';
import { JobConfigModule } from './controllers/scheduled/jobConfig.module';
import { ExamModule } from './controllers/exam/exam.module';
import { ExamResultModule } from './controllers/examResult/examResult.module';
import { QuestionModule } from './controllers/question/question.module';
import { PayOSModule } from './common/services/payos/PayOS.module';
import { CertificateModule } from './controllers/certificate/certificate.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    CoreModule,
    UsersModule,
    StudentsModule,
    InstructorsModule,
    CoursesModule,
    CourseChaptersModule,
    CourseLessonsModule,
    CourseMaterialsModule,
    FilesModule,
    PrerequisitesModule,
    ErrollmentsModule,
    LearnPathsModule,
    LearnPathCoursesModule,
    GradesModule,
    CompleteCoursesModule,
    GoalsModule,
    AcademicAdvisingsModule,
    WorkerModule,
    PayOSModule,
    CoinsModule,
    TransactionHistoryModule,
    ProgressModule,
    AdvisingChatModule,
    CategoryDocumentModule,
    DocumentModule,
    JobConfigModule,
    ExamModule,
    ExamResultModule,
    QuestionModule,
    CertificateModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpContextInterceptor, // Kích hoạt Interceptor cho toàn bộ ứng dụng
    },
    
  ],
})
export class AppModule {}
