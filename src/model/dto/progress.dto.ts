// src/dto/progress.dto.ts
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { BaseDto } from './base.dto';
import { ProgressStatus } from '@prisma/client';
import { AutoMap } from '@automapper/classes';
import { EnrollmentDto } from './errollment.dto';
import { CourseMaterialDto } from './course.dto';

export class ProgressDto extends BaseDto {
    @IsInt()
    @AutoMap()
    enrollmentId: number;

    @IsInt()
    @AutoMap()
    materialId: number;

    @IsEnum(ProgressStatus)
    @AutoMap()
    status: ProgressStatus;

    enrollment: EnrollmentDto;
    material: CourseMaterialDto;
    @AutoMap()
    courseId: number;
}
