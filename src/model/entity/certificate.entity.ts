import { AutoMap } from '@automapper/classes';
import { BaseEntity } from "./base.entity";
import { CertificateStatus } from '@prisma/client';

export class CertificateEntity extends BaseEntity {
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

    @AutoMap()
    instructorName?: string;
}
