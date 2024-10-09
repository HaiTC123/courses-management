// core/core.module.ts
import { Module, Global } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CoreService } from './core.service';
import { MapperService } from 'src/base/mapper.service';

@Global()
@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    
  ],
  providers: [ 
    MapperService,
    CoreService
],
  exports: [ 
    CoreService
],
})
export class CoreModule {}
