
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { CourseMaterial, ProgressStatus } from '@prisma/client';
import { EnrollmentEntity } from './enrollment.entity';
import { CourseLessonEntity, CourseMaterialEntity } from './course.entity';

export class ProgressEntity extends BaseEntity {
    @AutoMap()
    id: number;
    @AutoMap()
    enrollmentId: number;
    @AutoMap()
    materialId: number;
    @AutoMap()
    status: ProgressStatus;
    @AutoMap()
    completionDate?: Date;

    @AutoMap()
    courseId: number;

    enrollment: EnrollmentEntity;
    material: CourseMaterialEntity;
}

