import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CoreService } from 'src/core/core.service';
import { JobConfigEntity } from 'src/model/entity/jobconfig.entity';
import { JobConfigStatus } from 'src/model/enum/jobconfig.enum';
import { PrismaService } from 'src/repo/prisma.service';
import { generateRandomPassword, generateRandomString } from 'src/utils/common.utils';


@Injectable()
export class JobConfigService extends BaseService<JobConfigEntity, Prisma.JobConfigCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService) {
        super(prismaService, coreService)
    }

    async add(entity: JobConfigEntity): Promise<number> {
        if (!entity.jobDetail) {
            throw new HttpException('Thiếu thông tin cấu hình job', HttpStatus.BAD_REQUEST);
        }
        entity.status = JobConfigStatus.New;
        const jobDetail = JSON.parse(entity.jobDetail);
        entity.cronJob = this.buildCronExpression(
            entity.typeJob,
            jobDetail.specificTime,
            jobDetail.onceDate,
            jobDetail.dayOfWeek,
            jobDetail.dayOfMonth
        )
        // entity.relatedId : courseId
        // entity.realtedType: course
        // fixed
        entity.typeBusiness = "ScheduledCourse";
        entity.rawData = JSON.stringify({
            courseId: entity.relatedId
        });
        entity.relatedType = "Course";
        entity.key = `ScheduledCourse_${generateRandomString(8)}`;
        const id = await super.add(entity);

        return id;
    }

    
    async update(id: number, entity: Partial<JobConfigEntity>): Promise<boolean> {
        if (!entity.jobDetail) {
            throw new HttpException('Thiếu thông tin cấu hình job', HttpStatus.BAD_REQUEST);
        }
        entity.status = JobConfigStatus.New;
        const jobDetail = JSON.parse(entity.jobDetail);
        entity.cronJob = this.buildCronExpression(
            entity.typeJob,
            jobDetail.specificTime,
            jobDetail.onceDate,
            jobDetail.dayOfWeek,
            jobDetail.dayOfMonth
        )
        // to-do: delete job scheduled
        await super.update(id, entity);
        return true;
    }

    // Xóa entity
    async remove(id: number): Promise<void> {
        await super.remove(id);
        //to-do : delete job
    }
    /**
     * Xây dựng biểu thức cron dựa trên loại và các tham số được cung cấp.
     * 
     * @param type - Loại lịch trình, bao gồm các tùy chọn:
     *               'once' - Chạy một lần vào một ngày cụ thể.
     *               'daily' - Chạy hàng ngày vào một thời điểm cụ thể.
     *               'weekly' - Chạy vào một ngày cụ thể trong tuần.
     *               'monthly' - Chạy vào một ngày cụ thể trong tháng.
     * @param specificTime - Thời gian cụ thể theo định dạng "HH:mm", ví dụ: "14:30" cho 2:30 chiều.
     * @param onceDate - (Tùy chọn) Ngày cụ thể cho loại 'once', theo định dạng "YYYY-MM-DD", ví dụ: "2024-12-25".
     * @param dayOfWeek - (Tùy chọn) Ngày trong tuần cho loại 'weekly', với Chủ nhật là 1, Thứ hai là 2, ..., Thứ bảy là 7.
     * @param dayOfMonth - (Tùy chọn) Ngày trong tháng cho loại 'monthly', ví dụ: 15 cho ngày 15 hàng tháng.
     * 
     * @returns Biểu thức cron dựa trên các tham số lịch trình được cung cấp.
     * 
     * @throws Error nếu loại không hợp lệ.
     */
    buildCronExpression(
        type: string,
        specificTime: string,
        onceDate?: string,
        dayOfWeek?: number,
        dayOfMonth?: number
    ): string {
        // Tách giờ và phút từ specificTime
        const [hour, minute] = specificTime.split(':');

        switch (type) {
            case 'once':
                // Tách onceDate thành năm, tháng, ngày và xây dựng biểu thức cho một ngày cụ thể
                const [year, month, day] = onceDate.split('-');
                return `${minute} ${hour} ${parseInt(day)} ${parseInt(month)} ? ${year}`;

            case 'daily':
                // Hàng ngày vào giờ và phút cụ thể
                return `${minute} ${hour} * * ?`;

            case 'weekly':
                // Hàng tuần vào dayOfWeek cụ thể vào giờ và phút đã chọn
                return `${minute} ${hour} ? * ${dayOfWeek}`;

            case 'monthly':
                // Hàng tháng vào dayOfMonth vào giờ và phút cụ thể
                return `${minute} ${hour} ${dayOfMonth} * ?`;

            default:
                throw new Error('Invalid type');
        }
    }



}
