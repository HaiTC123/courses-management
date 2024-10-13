import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpContextInterceptor } from './common/interceptors/http-context.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    AuthModule,
    CoreModule
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
