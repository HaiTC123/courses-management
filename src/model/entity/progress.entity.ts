
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';
import { ProgressStatus } from '@prisma/client';
import { EnrollmentEntity } from './enrollment.entity';
import { CourseLessonEntity } from './course.entity';

export class ProgressEntity extends BaseEntity {
    @AutoMap()
    id: number;
    @AutoMap()
    enrollmentId: number;
    @AutoMap()
    lessonId: number;
    @AutoMap()
    status: ProgressStatus;
    @AutoMap()
    completionDate?: Date;

    enrollment: EnrollmentEntity;
    lesson: CourseLessonEntity;
}

