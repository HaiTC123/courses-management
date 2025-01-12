// user/user.repository.ts
import { Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repo';
import { CourseEntity } from 'src/model/entity/course.entity';
import { PageRequest } from 'src/model/request/page.request';
import { PageResult } from 'src/model/response/page.response';
import { validateInputs } from 'src/utils/common.utils';

export class CourseRepository extends BaseRepository<CourseEntity, Prisma.CourseCreateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.course);
  }

  async findOneWithCondition(conditions: { [key: string]: any }): Promise<CourseEntity | null> {
    const data = await this.model.findFirst({
      where: conditions,
      include: {
        _count: {
          select: { enrollment: true }
        }
      }
    });

    this.processCountEnrollment(data);
    return data;
  }


  async findOneWithConditionAndGetReference(conditions: { [key: string]: any }, includeReferences: { [key: string]: boolean } = {}): Promise<CourseEntity | null> {
    var data = await this.model.findFirst({
      where: conditions,
      include: {
        ...includeReferences, _count: {
          select: { enrollment: true }
        }
      },

    });
    this.processCountEnrollment(data);
    return data;
  }

  async findManyWithCondition(conditions: { [key: string]: any }): Promise<CourseEntity[] | null> {
    var datas = await this.model.findMany({
      where: conditions,
      include: {
        _count: {
          select: { enrollment: true }
        },
        enrollment: true,
        instructor: {
          select: {
            user: true
          }
        }
      }
    });
    this.processCountEnrollments(datas);
    return datas;
  }

  async doGetDataPaging(query, pageRequest){
    const includes = pageRequest.includeReferences ? pageRequest.includeReferences : {};
    var datas = await this.model.findMany({
      ...query,
      skip: (pageRequest.pageNumber - 1) * pageRequest.pageSize,
      take: pageRequest.pageSize,
      include: {
        ...includes,
        _count: {
          select: { enrollment: true }
        }
      }
    });
    this.processCountEnrollments(datas);
    return datas;
  }

  private processCountEnrollments(datas: []) {
    if (!datas) return datas;
    datas.forEach((data) => {
      this.processCountEnrollment(data);
    })
    return datas;
  }

  private processCountEnrollment(data: any) {
    if (data && data._count) {
      // Gắn số lượng `enrollments` vào `data`
      data.enrollmentsCount = data._count.enrollment;
    } else {
      // Nếu không có dữ liệu hoặc `_count`, gán số lượng bằng 0
      data.enrollmentsCount = 0;
    }
    return data;
  }

}
