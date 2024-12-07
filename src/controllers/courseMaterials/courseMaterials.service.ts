import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { CourseStatus, Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import {  CourseMaterialEntity } from 'src/model/entity/course.entity';
import { PrismaService } from 'src/repo/prisma.service';
import { ProgressService } from '../progress/progress.service';


@Injectable()
export class CourseMaterialsService extends BaseService<CourseMaterialEntity, Prisma.CourseMaterialCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService,
        protected readonly progressService: ProgressService) {
        super(prismaService, coreService)
    }

    async add(entity: CourseMaterialEntity): Promise<number> {
        let id = await super.add(entity);
        const course = await this.getCourseByMaterialId(entity.lessonId);
        if (course && course.status == CourseStatus.APPROVED) {
            await this.progressService.addProgressWhenAddMaterialForStudents(course.id, id);
        }
        return id;
    }

    async getCourseByMaterialId(lessonId: number) {
        const course = await this.prismaService.courseLesson.findUnique({
            where: {
                id: lessonId, // tìm kiếm theo lessonId
            },
            select: {
                chapter: {
                    select: {
                        course: true // lấy courseId từ chapter
                    },
                },
            },
        });

        return course?.chapter?.course;;
    }
}
