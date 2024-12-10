import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { QuestionEntity } from './question.entity';
import { ExamStatus } from '@prisma/client';

export class ExamEntity extends BaseEntity{
  @AutoMap()
  id: number;

  @AutoMap()
  courseId: number;

  @AutoMap()
  title: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  passingScore: number;

  @AutoMap()
  maxAttempts?: number;

  @AutoMap()
  endTime: Date;

  @AutoMap()
  questions: QuestionEntity;

  @AutoMap()
  status: ExamStatus;

}
