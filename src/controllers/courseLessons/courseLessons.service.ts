import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { CourseStatus, Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CourseLessonEntity } from 'src/model/entity/course.entity';
import { PrismaService } from 'src/repo/prisma.service';
import { ProgressService } from '../progress/progress.service';


@Injectable()
export class CourseLessonsService extends BaseService<CourseLessonEntity, Prisma.CourseLessonCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService,
        protected readonly progressService: ProgressService) {
        super(prismaService, coreService)
    }

    async add(entity: CourseLessonEntity): Promise<number> {
        let id = await super.add(entity);
        // const course = await this.getCourseByLessonId(id);
        // if (course && course.status == CourseStatus.APPROVED) {
        //     await this.progressService.addProgressWhenAddLessonForStudents(course.id, id);
        // }
        return id;
    }
    async remove(id: number): Promise<void> {
        await super.remove(id);


    }

    // async getCourseByLessonId(lessonId: number) {
    //     const course = await this.prismaService.courseLesson.findUnique({
    //         where: {
    //             id: lessonId, // tìm kiếm theo lessonId
    //         },
    //         select: {
    //             chapter: {
    //                 select: {
    //                     course: true // lấy courseId từ chapter
    //                 },
    //             },
    //         },
    //     });

    //     return course?.chapter?.course;;
    // }

    // Xóa Danh sách Entity theo IDs
    async removeIDs(ids: number[]): Promise<void> {
        await super.removeIDs(ids);

    }

}
