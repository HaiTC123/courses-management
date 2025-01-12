import { AutoMap } from '@automapper/classes';
import { BaseDto } from "./base.dto";
import { CertificateStatus } from '@prisma/client';

export class CertificateDto extends BaseDto {
  @AutoMap()
  id: number;

  
  @AutoMap()
  userId: number;

  
  @AutoMap()
  courseId?: number;

  
  @AutoMap()
  learningPathId?: number;

  
  @AutoMap()
  issuedDate: Date;

  
  @AutoMap()
  expiresDate?: Date;

  
  @AutoMap()
  title: string;

  
  @AutoMap()
  description?: string;

  @AutoMap()
  status: CertificateStatus;

  @AutoMap()
  courseName?: string;

  
  @AutoMap()
  learningPathName?: string;

  
  @AutoMap()
  isCourse: boolean;

  @AutoMap()
  fullName?: string;
  
}
