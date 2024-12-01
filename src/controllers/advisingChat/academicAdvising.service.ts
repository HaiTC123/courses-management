import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { AdvisingStatus, Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { NotificationType } from 'src/common/const/notification.type';
import { CoreService } from 'src/core/core.service';
import { AdvisingChatDto } from 'src/model/dto/grade.dto';
import { AdvisingChatEntity } from 'src/model/entity/grade.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class AdvisingChatService extends BaseService<AdvisingChatEntity, Prisma.AdvisingChatCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async studentSend(param: AdvisingChatDto) {
        const data = await this.prismaService.academicAdvising.findUnique({
            where: {
                id: param.advisingId
            }
        })
        if (!data) {
            throw new HttpException({ message: 'Thông tin buổi tư vấn không tồn tại' }, HttpStatus.BAD_REQUEST);
        }
        if (data.status != AdvisingStatus.Approved) {
            throw new HttpException({ message: 'Trạng thái buổi tư vấn không hợp lệ' }, HttpStatus.BAD_REQUEST);
        }
        var entity = new AdvisingChatEntity();
        entity.advisingId = param.advisingId;
        entity.senderId = this._authService.getUserID();
        entity.message = param.message;
        const id = await super.add(entity);
        const instructor = await this.prismaService.instructor.findUnique({
            where: {
                id: data.advisorId
            }
        })
        if (instructor) {
            // send notification to advisor
            await this.pushNotification(instructor?.userId, NotificationType.Student_Chat_Advising_To_Advisor,
                JSON.stringify({
                    academicAdvisingID: id,
                    topic: data.topic,
                    message: param.message
                }),
                this._authService.getFullname(), this._authService.getUserID()

            )
        }

        return id;
    }

    async advisorSend(param: AdvisingChatDto) {
        const data = await this.prismaService.academicAdvising.findUnique({
            where: {
                id: param.advisingId
            }
        })
        if (!data) {
            throw new HttpException({ message: 'Thông tin buổi tư vấn không tồn tại' }, HttpStatus.BAD_REQUEST);
        }
        if (data.status != AdvisingStatus.Approved) {
            throw new HttpException({ message: 'Trạng thái buổi tư vấn không hợp lệ' }, HttpStatus.BAD_REQUEST);
        }
        var entity = new AdvisingChatEntity();
        entity.advisingId = param.advisingId;
        entity.senderId = this._authService.getUserID();
        entity.message = param.message;
        const id = await super.add(entity);
        const student = await this.prismaService.student.findUnique({
            where: {
                id: data.studentId
            }
        })
        if (student) {
            // send notification to advisor
            await this.pushNotification(student?.userId, NotificationType.Advisor_Chat_Advising_To_Student,
                JSON.stringify({
                    academicAdvisingID: id,
                    topic: data.topic,
                    message: param.message
                }),
                this._authService.getFullname(), this._authService.getUserID()

            )
        }

        return id;
    }

}
