import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { NotificationType } from 'src/common/const/notification.type';
import { CoreService } from 'src/core/core.service';
import { AcademicAdvisingEntity } from 'src/model/entity/grade.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class AcademicAdvisingsService extends BaseService<AcademicAdvisingEntity, Prisma.AcademicAdvisingCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: AcademicAdvisingEntity): Promise<number> {
        if (!entity.advisorId) {
            throw new HttpException({ message: 'Invalid param AdvisorId' }, HttpStatus.BAD_REQUEST)
        }
        entity.status = AdvisingStatus.Scheduled;
        entity.studentId = this._authService.getStudentID();
        const id = await super.add(entity);
        // send notificaiton to advisor
        const instructor = await this.prismaService.instructor.findUnique({
            where: {
                id: entity.advisorId
            }
        })
        await this.pushNotification(instructor.userId, NotificationType.Student_Send_Advising_To_Advisor,
            JSON.stringify({
                academicAdvisingID: id,
                topic: entity.topic
            }),
            this._authService.getFullname(), this._authService.getUserID()

        )
        return id;
    }

    async advisorUpdateStatus(id: number, status: AdvisingStatus){
        var data = await super.getById(id);
        if (!data){
            throw new HttpException({ message: 'Thông tin buổi tư vấn không tồn tại' }, HttpStatus.BAD_REQUEST)
        }
        data.status = status;

        await super.update(id, data);
        const student = await this.prismaService.student.findUnique({
            where: {
                id: data.studentId
            }
        })
        if (student) {
            await this.pushNotification(student?.userId, status,
                JSON.stringify({
                    academicAdvisingID: id,
                    topic: data.topic
                }),
                this._authService.getFullname(), this._authService.getUserID()
    
            )
        }

        return true;
    }

    async studentUpdateStatus(id: number, status: AdvisingStatus){
        var data = await super.getById(id);
        if (!data){
            throw new HttpException({ message: 'Thông tin buổi tư vấn không tồn tại' }, HttpStatus.BAD_REQUEST)
        }
       
        const instructor = await this.prismaService.instructor.findUnique({
            where: {
                id: data.advisorId
            }
        })
        if (instructor && data.status == AdvisingStatus.Approved && status == AdvisingStatus.Cancelled) {
            await this.pushNotification(instructor?.userId, status,
                JSON.stringify({
                    academicAdvisingID: id,
                    topic: data.topic
                }),
                this._authService.getFullname(), this._authService.getUserID()
    
            )
        }
        data.status = status;
        await super.update(id, data);
        return true;
    }

}
