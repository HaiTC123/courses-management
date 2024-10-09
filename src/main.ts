import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các trường không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Bắn lỗi nếu có trường không hợp lệ
      transform: true, // Chuyển đổi input thành kiểu dữ liệu được khai báo trong DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
