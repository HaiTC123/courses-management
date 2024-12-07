import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { BaseDto } from './base.dto';
import { AutoMap } from '@automapper/classes';
import { IsInt, IsString } from 'class-validator';
import { UserDto } from './user.dto';


export class GradeDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    enrollmentId: number;

    @ApiProperty()
    @AutoMap()
    courseId: number;

    @ApiProperty()
    @AutoMap()
    studentId: number;

    @ApiProperty()
    @AutoMap()
    grade: Decimal;

    @ApiProperty()
    @AutoMap()
    gradeDate: Date;
}

export class FailedCourseDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    studentId: number;

    @ApiProperty()
    @AutoMap()
    courseId: number;

    @ApiProperty()
    @AutoMap()
    semesterId: number;

    @ApiProperty()
    @AutoMap()
    enrollmentId: number;

    @ApiProperty()
    @AutoMap()
    failureReason: string;

    @ApiProperty()
    @AutoMap()
    failedDate: Date;

}

export class CourseCompletionDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    studentId: number;

    @ApiProperty()
    @AutoMap()
    courseId: number;

    @ApiProperty()
    @AutoMap()
    enrollmentId: number;

    @ApiProperty()
    @AutoMap()
    semesterId: number;

    @ApiProperty()
    @AutoMap()
    completionDate: Date;

    @ApiProperty({ required: false })
    @AutoMap()
    finalGrade?: Decimal;
}

export class GoalDto extends BaseDto{
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    studentId: number;

    @ApiProperty()
    @AutoMap()
    courseId: number;

    @ApiProperty()
    @AutoMap()
    targetCompletionDate: Date;

    @ApiProperty()
    @AutoMap()
    status: string;

}

export class AcademicAdvisingDto extends BaseDto{

    @ApiProperty()
    @AutoMap()
    id?: number;

    @ApiProperty()
    @AutoMap()
    studentId?: number;

    @ApiProperty()
    @AutoMap()
    advisorId: number;

    @ApiProperty()
    @AutoMap()
    advisingDate: Date;

    @ApiProperty()
    @AutoMap()
    topic: string;

    @ApiProperty({ required: false })
    @AutoMap()
    notes?: string;

    @ApiProperty()
    @AutoMap()
    status?: string;
}


export class AdvisingChatDto extends BaseDto {
    @AutoMap()
    @ApiProperty()
    @IsInt()
    advisingId: number;
  
    @AutoMap()
    @ApiProperty()
    @IsString()
    message: string;
  
    sender: UserDto;
  }
  