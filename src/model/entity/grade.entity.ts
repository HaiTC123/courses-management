import { Decimal } from "@prisma/client/runtime/library";
import { BaseEntity } from "./base.entity";
import { AutoMap } from "@automapper/classes";


export class GradeEntity extends BaseEntity {
    @AutoMap()
    id: number;
    @AutoMap()
    enrollmentId: number;
    @AutoMap()
    courseId: number;
    @AutoMap()
    studentId: number;
    @AutoMap()
    grade: Decimal;
    @AutoMap()
    gradeDate: Date;
}

export class FailedCourseEntity extends BaseEntity {
    @AutoMap()
    id: number;
    @AutoMap()
    studentId: number;
    @AutoMap()
    courseId: number;
    @AutoMap()
    semesterId: number;
    @AutoMap()
    enrollmentId: number;
    @AutoMap()
    failureReason: string;
    @AutoMap()
    failedDate: Date;
}


export class GoalEntity extends BaseEntity{
    @AutoMap()
    id: number;
    @AutoMap()
    studentId: number;
    @AutoMap()
    courseId: number;
    @AutoMap()
    targetCompletionDate: Date;
    @AutoMap()
    status: string;
}

export class AcademicAdvisingEntity extends BaseEntity{
    @AutoMap()
    id: number;
    @AutoMap()
    studentId: number;
    @AutoMap()
    advisorId: number;
    @AutoMap()
    advisingDate: Date;
    @AutoMap()
    topic: string;
    @AutoMap()
    notes?: string;
    @AutoMap()
    status: string;
}


export class AdvisingChatEntity extends BaseEntity {
  @AutoMap()
  id: number;

  @AutoMap()
  advisingId: number;

  @AutoMap()
  senderId: number;

  @AutoMap()
  message: string;

}
