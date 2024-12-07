import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, ProgressStatus } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { ProgressEntity } from 'src/model/entity/progress.entity';
import { PrismaService } from 'src/repo/prisma.service';


@Injectable()
export class ProgressService extends BaseService<ProgressEntity, Prisma.ProgressCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async addMaterialProgressForStudent(enrollmentId: number, courseId: number) {
        // courseId là tham số đầu vào
        const courseMaterials = await this.prismaService.courseMaterial.findMany({
            where: {
                lesson: {
                    chapter: {
                        courseId: courseId, // Khóa học có ID là courseId
                    },
                },
            },
            include: {
                lesson: {
                    select: {
                        chapter: {
                            select: {
                                courseId: true,
                            },
                        },
                    },
                },
            },
        });


        const materialIds = courseMaterials.map(x => x.id);

        for (const materialId of materialIds) {
            await this.prismaService.progress.create({
                data: {
                    enrollmentId: enrollmentId,
                    materialId,
                    status: ProgressStatus.NotStarted,
                    courseId
                },
            });
        }
    }

    async addProgressWhenAddMaterialForStudents(courseId: number, materialId: number) {
        const enrollments = await this.prismaService.enrollment.findMany({
            where: {
                courseId,
                semesterId: 2 // to-do
            }
        });

        for (const enroll of enrollments) {
            await this.prismaService.progress.create({
                data: {
                    enrollmentId: enroll.id,
                    materialId,
                    status: ProgressStatus.NotStarted,
                    courseId
                },
            });
        }
    }

    async getCourseByMaterialId(materialId: number) {
        const course = await this.prismaService.course.findFirst({
          where: {
            chapters: {
              some: {
                lessons: {
                  some: {
                    materials: {
                      some: {
                        id: materialId,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      
        return course;
      }
      
    async doneProgress(materialId: number) {
        const course = await this.getCourseByMaterialId(materialId);
        if (!course) {
            return false;
        }
        const courseId = course.id;

        const enrollment = await this.prismaService.enrollment.findFirst({
            where: {
                courseId: courseId,       // ID của khóa học
                studentId: this._authService.getStudentID(),     // ID của sinh viên
                semesterId: 2    // ID của học kỳ to-do
            },
            select: {
                id: true,                 // Chỉ lấy ra `id` của bảng Enrollment
            },
        });

        const enrollmentId = enrollment?.id;

        await this.prismaService.progress.updateMany({
            where: {
                enrollmentId: enrollmentId,
                materialId: materialId
            },
            data: {
                completionDate: new Date(),
                status: ProgressStatus.Completed
            }
        })
        return true;

    }

    async removeMaterialProgressForStudents(materialId: number) {
        await this.prismaService.progress.deleteMany({
            where: { materialId },
        });
    }

    async removeMaterialProgressForStudentsMany(materialIds: number[]) {
        await this.prismaService.progress.deleteMany({
            where: {
                materialId: {
                    in: materialIds
                }
            }
        });
    }

    async getCourseProgress(courseId: number) {
        // Bước 1: Lấy tổng số tài liệu trong khóa học
        const totalMaterials = await this.prismaService.courseMaterial.count({
            where: { lesson: { chapter: { courseId } } },
        });
    
        // Bước 2: Lấy số tài liệu đã hoàn thành của người dùng trong khóa học
        const completedMaterials = await this.prismaService.progress.count({
            where: {
                enrollment: {
                    studentId: this._authService.getStudentID(),
                    courseId,
                    semesterId: 2 // to-do: xử lý logic semester nếu cần
                },
                status: ProgressStatus.Completed,
            },
        });
    
        // Bước 3: Trả về tiến trình dưới dạng số tài liệu đã học / tổng số tài liệu
        return {
            completed: completedMaterials,
            total: totalMaterials,
        };
    }
    
}
