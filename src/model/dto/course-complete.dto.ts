import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CourseCompletionDto extends BaseDto{
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  studentId: number;

  @AutoMap()
  @ApiProperty()
  courseId: number;

  @AutoMap()
  @ApiProperty()
  enrollmentId: number;

  @AutoMap()
  @ApiProperty()
  completionDate: Date;

  @AutoMap()
  @ApiProperty()
  finalGrade?: number;

}
