// src/dto/progress.dto.ts
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { BaseDto } from './base.dto';
import { ProgressStatus } from '@prisma/client';
import { AutoMap } from '@automapper/classes';

export class ProgressDto extends BaseDto {
    @IsInt()
    @AutoMap()
    enrollmentId: number;

    @IsInt()
    @AutoMap()
    lessonId: number;

    @IsEnum(ProgressStatus)
    @AutoMap()
    status: ProgressStatus;
}
