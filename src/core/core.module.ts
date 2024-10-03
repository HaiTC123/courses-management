// core/core.module.ts
import { Module, Global } from '@nestjs/common';
import { MapperService } from 'src/base/mapper.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Global() // Sử dụng Global để module có thể được dùng ở mọi nơi mà không cần import lại
@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [ MapperService],
  exports: [ MapperService],
})
export class CoreModule {}
