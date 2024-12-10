import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { QuestionDto } from './question.dto';
import { ExamStatus } from '@prisma/client';

export class ExamDto extends BaseDto{
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  courseId: number;

  @ApiProperty()
  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  description?: string;

  @ApiProperty()
  @AutoMap()
  passingScore: number;

  @ApiProperty()
  @AutoMap()
  maxAttempts?: number;

  @AutoMap()
  @ApiProperty()
  endTime: Date;

  @AutoMap()
  @ApiProperty()
  questions: QuestionDto;

  @AutoMap()
  @ApiProperty()
  status: ExamStatus;
  
}
