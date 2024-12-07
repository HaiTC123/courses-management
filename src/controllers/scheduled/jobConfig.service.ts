import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { WorkerService } from 'src/common/services/worker/worker.service';
import { CoreService } from 'src/core/core.service';
import { JobConfigEntity } from 'src/model/entity/jobconfig.entity';
import { JobConfigStatus } from 'src/model/enum/jobconfig.enum';
import { PrismaService } from 'src/repo/prisma.service';
import { generateRandomPassword, generateRandomString } from 'src/utils/common.utils';


@Injectable()
export class JobConfigService extends BaseService<JobConfigEntity, Prisma.JobConfigCreateInput> {
    constructor(
        coreService: CoreService,
        protected readonly prismaService: PrismaService
    ) {
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
            jobDetail.dayOfWeek
        )
        // fixed
        entity.typeBusiness = "ScheduledCourse";
        entity.rawData = JSON.stringify({
            courseId: entity.relatedId,
            userId: this._authService.getUserID(),
            fullName: this._authService.getFullname()
        });
        entity.relatedType = "Course";
        entity.key = `ScheduledCourse_${generateRandomString(8)}`;
        entity.status = JobConfigStatus.New;
        const id = await super.add(entity);
        return id;
    }


    async update(id: number, entity: Partial<JobConfigEntity>): Promise<boolean> {
        if (!entity.jobDetail) {
            throw new HttpException('Thiếu thông tin cấu hình job', HttpStatus.BAD_REQUEST);
        }
        var job = await super.getById(id);
        await WorkerService.removeRunningJob(id, job.key);
        const jobDetail = JSON.parse(entity.jobDetail);
        entity.cronJob = this.buildCronExpression(
            entity.typeJob,
            jobDetail.specificTime,
            jobDetail.onceDate,
            jobDetail.dayOfWeek
        )
        entity.key = job.key;
        entity.status = JobConfigStatus.New;
        entity.typeBusiness = "ScheduledCourse";
        entity.rawData = JSON.stringify({
            courseId: job.relatedId,
            userId: this._authService.getUserID(),
            fullName: this._authService.getFullname()
        });
        entity.relatedType = "Course";
        // to-do: delete job scheduled
        await super.update(id, entity);
        return true;
    }

    // Xóa entity
    async remove(id: number): Promise<void> {
        var job = await super.getById(id);
        await WorkerService.removeRunningJob(id, job.key);
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
     * 
     * @returns Biểu thức cron dựa trên các tham số lịch trình được cung cấp.
     * 
     * @throws Error nếu loại không hợp lệ.
     */
    buildCronExpression(
        type: string,
        specificTime: string,
        onceDate?: string,
        dayOfWeek?: number
    ): string {
        // Tách giờ và phút từ specificTime
        const [hour, minute] = specificTime.split(':');

        switch (type) {
            case 'once':
                // Tách onceDate thành năm, tháng, ngày và xây dựng biểu thức cho một ngày cụ thể
                const [year, month, day] = onceDate.split('-');

                // Lược bỏ năm vì cron không hỗ trợ trường năm
                return `${minute} ${hour} ${parseInt(day)} ${parseInt(month)} *`;

            case 'daily':
                // Hàng ngày vào giờ và phút cụ thể
                return `${minute} ${hour} * * *`;

            case 'weekly':
                // Hàng tuần vào dayOfWeek cụ thể vào giờ và phút đã chọn
                // Kiểm tra giá trị của dayOfWeek (0-6, trong đó 0 là Chủ Nhật)
                if (dayOfWeek < 0 || dayOfWeek > 6) {
                    throw new Error('dayOfWeek must be between 0 and 6');
                }
                return `${minute} ${hour} ? * ${dayOfWeek}`;

            default:
                throw new Error('Invalid type');
        }
    }





}
