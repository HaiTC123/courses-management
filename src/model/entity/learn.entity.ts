import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { CourseEntity } from './course.entity';
import { AutoMap } from '@automapper/classes';

export class LearningPathEntity extends BaseEntity{
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  pathName: string;

  @ApiProperty()
  @AutoMap()
  description?: string;

  courses: CourseEntity[];
}

export class LearningPathCourseEntity extends BaseEntity{
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

  course: CourseEntity;
}
