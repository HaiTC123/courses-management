import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CoursesService } from 'src/controllers/courses/courses.service';
import { JobConfigStatus, TypeJob } from 'src/model/enum/jobconfig.enum';
import { PrismaService } from 'src/repo/prisma.service';

@Injectable()
export class WorkerService {

    // Lưu trữ các cron jobs đang chạy
    private static runningJobs: { [key: number]: CronJob } = {};
    private handleJob = {
        [TypeJob.Once]: this.handleJobOnlyOnce,
        [TypeJob.Weekly]: this.handleJobWeekly,
        [TypeJob.Daily]: this.handleJobDaily,

    }
    constructor(
        private readonly prismaService: PrismaService,
        private readonly courseService: CoursesService
    ) { }

    // Cron job chạy mỗi phút để quét các cấu hình công việc mới
    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        console.log('cron job start')
        const jobConfigs = await this.prismaService.jobConfig.findMany({
            where: { status: JobConfigStatus.New },
        });
        if (!jobConfigs || !jobConfigs.length) {
            console.log(`Not exist job to execute ${new Date().toDateString()}`)
        }

        for (const config of jobConfigs) {
            await this.scheduleJob(config);
        }
    }

    async scheduleJob(config) {
        const jobConfigID = config.id;
        const { endTime } = config;
        let status = JobConfigStatus.WaitExcute;
        let description = "";
        if (!endTime || new Date(endTime) < new Date()) {
            status = JobConfigStatus.Done;
            description = "Thời gian chạy quá hạn";
            console.log(`Job ${jobConfigID} time expiredDate`);
            return;
        } else {
            this.startJob(config, config.id)
        }
        await this.prismaService.jobConfig.update({
            where: { id: config.id },
            data: { status, description },
        });
    }
    private startJob(config, jobConfigID: number) {
        const { cronJob, key } = config;

        // Tạo cron job từ cron expression
        const job = new CronJob(cronJob, async () => {
            console.log(`Executing job ${jobConfigID}`);
            await this.executeJob(config);
        });

        // Lưu trữ job vào runningJobs
        WorkerService.runningJobs[key] = job;

        // Start job
        job.start();
        console.log(`Started job ${jobConfigID}`);
    }

    private async executeJob(config) {
        console.log(`Job executed: ${JSON.stringify(config)}`);
        const { endTime, cronJob, typeJob } = config;

        var handle = this.handleJob[typeJob];
        if (handle == null) {
            console.log(`TypeJob not implement ${config.id}`);
            return;
        }
        let result = await handle.apply(this, [config]);
        //to-do
        if (result) {
        } else {

        }
    }
    // Xóa job khỏi runningJobs
    public static removeRunningJob(jobConfigID: number, key: string) {
        const job = WorkerService.runningJobs[key];
        if (job) {
            job.stop();  // Dừng job
            delete WorkerService.runningJobs[key];  // Xóa job khỏi danh sách đang chạy
            console.log(`Job ${jobConfigID} stopped and removed.`);
        }
    }

    // Phương thức để xóa job đang chạy theo jobConfigID
    public stopJob(jobConfigID: number, key: string) {
        WorkerService.removeRunningJob(jobConfigID, key);
    }


    private async handleJobOnlyOnce(config): Promise<boolean> {
        console.log(`Handle Job OnlyOnce: ${JSON.stringify(config)}`);
        const { endTime, id, key } = config;
        // Kiểm tra thời gian kết thúc của job
        if (this.isJobExpired(endTime)) {
            await WorkerService.removeRunningJob(id, key);
            return false; // Early return nếu job đã hết hạn
        }
        await this.executeBusinessLogic(config);
        await this.updateJobStatus(id, JobConfigStatus.Done, "Chạy job thành công");
        WorkerService.removeRunningJob(config.id, config.key);
        return true;
    }

    private async handleJobDaily(config): Promise<boolean> {
        console.log(`Handle Job Daily: ${JSON.stringify(config)}`);
        const { endTime, id, key } = config;
        // Kiểm tra thời gian kết thúc của job
        if (this.isJobExpired(endTime)) {
            await WorkerService.removeRunningJob(id, key);
            await this.updateJobStatus(id, JobConfigStatus.Done, "Chạy job thành công");
            return false; // Early return nếu job đã hết hạn
        }
        await this.executeBusinessLogic(config);
        return true;
    }


    private async handleJobWeekly(config): Promise<boolean> {
        console.log(`Handle Job Weekly: ${JSON.stringify(config)}`);
        const { endTime, id, key } = config;
        // Kiểm tra thời gian kết thúc của job
        if (this.isJobExpired(endTime)) {
            await WorkerService.removeRunningJob(id, key);
            await this.updateJobStatus(id, JobConfigStatus.Done, "Chạy job thành công");
            return false; // Early return nếu job đã hết hạn
        }
        await this.executeBusinessLogic(config);
        return true;
    }


    // Kiểm tra nếu job đã hết hạn
    private isJobExpired(endTime: string): boolean {
        return !endTime || new Date(endTime) < new Date();
    }

    private async updateJobStatus(id: number, status: string, description: string): Promise<void> {
        await this.prismaService.jobConfig.update({
            where: { id: id },
            data: { status, description },
        });
    }

    private async executeBusinessLogic(config): Promise<boolean> {
        try {
            switch (config.typeBusiness) {
                case "ScheduledCourse":
                    await this.courseService.handleScheduleCourse(config.rawData);
                    return true; // Thành công nếu công việc xử lý xong
                default:
                    console.warn(`No handler for business type: ${config.typeBusiness}`);
                    return false; // Không có handler cho loại business này
            }
        } catch (error) {
            console.error(`Error executing job for business type ${config.typeBusiness}:`, error);
            return false; // Trả về false nếu có lỗi trong quá trình thực thi
        }
    }
}
