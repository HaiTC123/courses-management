import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';


export class QuestionEntity extends BaseEntity {
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
    orderNo: Number;

}
