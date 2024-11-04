import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { LearningPathDto } from 'src/model/dto/learn.dto';
import { LearningPathEntity } from 'src/model/entity/learn.entity';
import { ServiceResponse } from 'src/model/response/service.response';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class LearnPathsService extends BaseService<LearningPathEntity, Prisma.LearningPathCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }
    async getLearningPathWithCourses(id: number): Promise<ServiceResponse> {
        var learnPath = await this.prismaService.learningPath.findUnique({
            where: { id },
            include: {
                courses: {
                    include: {
                        course: true, // Bao gồm chi tiết khóa học nếu cần
                    },
                },
            },
        });
        const result = this._mapperService.mapData(learnPath, LearningPathEntity, LearningPathDto);
        return ServiceResponse.onSuccess(result)
    }


}
