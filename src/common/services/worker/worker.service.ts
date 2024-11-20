import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/repo/prisma.service';

export enum TypeJob {
    OnlyOnce = 'OnlyOnce',
    Loop = 'Loop',
}

export enum JobConfigStatus {
    New = 'New',
    WaitExcute = 'WaitExcute',
    Done = 'Done',
}

@Injectable()
export class WorkerService {
    private handleJob = {
        [TypeJob.OnlyOnce]: this.handleJobOnlyOnce,
        [TypeJob.Loop]: this.handleJobLoop
    }
    constructor(
        private readonly prismaService: PrismaService
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
        const { jobScheduledTime, cronJob, typeJob } = config;
        var handle = this.handleJob[typeJob];
        if (handle == null) {
            console.log(`TypeJob not implement ${jobConfigID}`);
            return;
        }
        let result = handle[typeJob](config);
        if (result) {
            // to-do
        }

        await this.prismaService.jobConfig.update({
            where: { id: jobConfigID },
            data: { status: JobConfigStatus.WaitExcute },
        });
    }

    //   scheduleCronJob(jobConfigID: number, cronExpression: string) {
    //     const cronJob = new CronJob(cronExpression, () => {
    //       this.workerJobService.executeJob(jobConfigID);
    //     });

    //     cronJob.start();
    //   }


    private async handleJobOnlyOnce(config): Promise<boolean> {
        console.log(`Handle Job OnlyOnce: ${JSON.stringify(config)}`);
        const { jobScheduledTime, cronJob, typeJob } = config;
        if (!jobScheduledTime || new Date(jobScheduledTime) < new Date()) {
            return false;
        }
        
        return true;
    }

    private async handleJobLoop(config): Promise<boolean> {
        console.log(`Handle Job Loop: ${JSON.stringify(config)}`);
        return true;
    }

}
