

import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';


export class QuestionDto extends BaseDto {
    @AutoMap()
    id: number;

    @AutoMap()
    examId: number;

    @AutoMap()
    content: string;

    @AutoMap()
    correctAnswer: string;

    @AutoMap()
    options: string[];

    @AutoMap()
    orderNo: number;

}

export class QuestionStudentDto extends BaseDto {
    @AutoMap()
    id: number;

    @AutoMap()
    examId: number;

    @AutoMap()
    content: string;

    @AutoMap()
    options: string[];

    @AutoMap()
    orderNo: number;

}

