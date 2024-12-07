import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { GradeEntity } from 'src/model/entity/grade.entity';
import { ServiceResponse } from 'src/model/response/service.response';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class GradesService extends BaseService<GradeEntity, Prisma.GradeCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: GradeEntity): Promise<number> {
        var grade = await this.getOne({
            enrollmentId: entity.enrollmentId,
            courseId: entity.courseId,
            studentId: entity.studentId
        })
        if (grade){
            throw new HttpException({ message: 'Điểm của sinh viên đã tồn tại. Vui lòng chỉnh sửa' }, HttpStatus.BAD_REQUEST)
        }
        entity.gradeDate = new Date();
        var result = await this.repository.create(entity, {
            select: {
                id: true
            }
        }, this.getMoreCreateData());
        return Number(result.id);
    }

}
