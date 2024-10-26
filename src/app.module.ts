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
@Module({
  imports: [
    AuthModule,
    CoreModule,
    UsersModule,
    StudentsModule,
    InstructorsModule,
    CoursesModule,
    CourseChaptersModule,
    CourseLessonsModule,
    CourseMaterialsModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpContextInterceptor, // Kích hoạt Interceptor cho toàn bộ ứng dụng
    }
  ],
})
export class AppModule {}
