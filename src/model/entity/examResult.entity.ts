import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';


export class ExamResultEntity extends BaseEntity {
    @AutoMap()
    id: number;

    @AutoMap()
    examId: number;

    @AutoMap()
    studentId: number;

    @AutoMap()
    score: number;

    @AutoMap()
    correctAnswers: number;

    @AutoMap()
    incorrectAnswers: number;

    @AutoMap()
    attemptNumber: number;

    @AutoMap()
    isPassed: boolean;

    @AutoMap()
    completedAt: Date;

    @AutoMap()
    options: string[];

    @AutoMap()
    result: string[];
}
