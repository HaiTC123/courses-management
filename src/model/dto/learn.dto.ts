import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { CourseDto } from './course.dto';
import { AutoMap } from '@automapper/classes';

export class LearningPathDto extends BaseDto{
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  pathName: string;

  @ApiProperty()
  @AutoMap()
  description?: string;

  courses: CourseDto[];
}

export class LearningPathCourseDto extends BaseDto{
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  learningPathId: number;

  @ApiProperty()
  @AutoMap()
  courseId: number;

  @ApiProperty()
  @AutoMap()
  sequenceOrder: number;

  @ApiProperty()
  @AutoMap()
  isMandatory: boolean;

  @ApiProperty()
  @AutoMap()
  description?: string;

  @ApiProperty()
  @AutoMap()
  title?: string;

  course: CourseDto;
}
