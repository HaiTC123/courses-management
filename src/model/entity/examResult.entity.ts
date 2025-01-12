import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { StudentEntity } from './student.entity';
import { InstructorEntity } from './instructor.enity';
import { ExamEntity } from './exam.entity';


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
    @AutoMap()
    student: StudentEntity;
    @AutoMap()
    exam: ExamEntity;
  
}
