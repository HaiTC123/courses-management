import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class ExamResultDto extends BaseDto {
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


}
