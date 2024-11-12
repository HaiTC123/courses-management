import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/repo/prisma.service';



@Injectable()
export class SemesterFinalizationService {
  constructor(private readonly prismaService: PrismaService) {}

  // Cron job chạy hàng ngày vào lúc 23:59 để kiểm tra và tổng hợp điểm cuối học kỳ
  @Cron(CronExpression.EVERY_10_SECONDS)
  async finalizeSemesterAutomatically() {
    console.log("conjob");
    return;
    const currentDate = new Date();

    // Tìm học kỳ hiện tại hoặc gần kết thúc
    const semester = await this.prismaService.semester.findFirst({
      where: {
        isCurrent: true,
        endDate: {
          lte: currentDate, // Học kỳ đã kết thúc
        },
      },
    });

    if (semester) {
      console.log(`Finalizing semester: ${semester.name}`);
      
      // Gọi hàm tổng hợp kết quả cho sinh viên
      await this.finalizeSemester(semester.id);
    }
  }

  // Hàm tổng hợp kết quả cho tất cả sinh viên trong học kỳ
  async finalizeSemester(semesterId: number) {
    const grades = await this.prismaService.grade.findMany({
      where: {
        enrollment: {
          semesterId: semesterId
        }
      },
      include: {
        enrollment: true,
      }
    });

    for (const grade of grades) {
      const studentId = grade.enrollment.studentId;
      const courseId = grade.enrollment.courseId;
      const enrollmentId = grade.enrollment.id;
      const finalGrade = grade.grade.toNumber();
      const completionDate = new Date();
      if (finalGrade >= 50) {
        // Đạt môn, thêm vào bảng CourseCompletion
        await this.prismaService.courseCompletion.create({
          data: {
            studentId: studentId,
            courseId: courseId,
            enrollmentId: enrollmentId,
            semesterId: semesterId,
            completionDate: completionDate,
            finalGrade: finalGrade,
          },
        });
      } else {
        // Rớt môn, thêm vào bảng FailedCourse
        await this.prismaService.failedCourse.create({
          data: {
            studentId: studentId,
            courseId: courseId,
            semesterId: semesterId,
            enrollmentId: enrollmentId,
            failureReason: 'Low Grade', // Vì lý do điểm thấp
            failedDate: completionDate,
          },
        });
      }
    }
    
    console.log('Semester finalization completed.');
  }
}
