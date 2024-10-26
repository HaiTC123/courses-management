import { HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { CourseEntity } from 'src/model/entity/course.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class CoursesService extends BaseService<CourseEntity, Prisma.CourseCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: CourseEntity): Promise<number> {
        if (!entity?.instructorId) {
            throw new HttpException({ message: 'InstructorID is null' }, HttpStatus.BAD_REQUEST);
        }
        entity.instructor = {
            connect: { id: entity.instructorId }
        }
        delete entity.instructorId;
        return await super.add(entity);
    }

    async getCourseWithDetails(courseId: number) {
        const course = await this.prismaService.course.findUnique({
            where: { id: courseId },
            include: {
                chapters: {
                    include: {
                        lessons: {
                            include: {
                                materials: true, // Lấy tất cả các materials liên quan
                            },
                        },
                    },
                },
            },
        });

        return course;
    }

}
