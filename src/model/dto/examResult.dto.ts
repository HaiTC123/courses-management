import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { StudentEntity } from '../entity/student.entity';
import { StudentDto } from './student.dto';
import { InstructorDto } from './instructor.dto';
import { ExamDto } from './exam.dto';

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

    @AutoMap()
    result: string[];

    @AutoMap()
    student: StudentDto;

    @AutoMap()
    exam: ExamDto;
}
