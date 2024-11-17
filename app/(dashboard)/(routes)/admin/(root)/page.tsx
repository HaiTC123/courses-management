"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { BarChartComponent } from "@/components/chart";
import { ChartConfig } from "@/components/ui/chart";
import { Combobox } from "@/components/ui/combobox";
import { CourseStatus } from "@/enum/course-status";
import { UserRole } from "@/enum/user-role";
import { getPaginatedCoursesService } from "@/services/course.service";
import {
  getReportPerformanceService,
  getReportRevenueCourse,
} from "@/services/report.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useCallback, useEffect, useState } from "react";

const chartConfigRevenue = {
  revenue: {
    label: "Doanh thu",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const chartConfigEnrollmentCount = {
  enrollmentCount: {
    label: "Số lượng đăng ký",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartConfigPerformance = {
  performance: {
    label: "Sinh viên",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const { role, user } = useAuthStore.getState();
  const router = useRouter();
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartDataPerformance, setChartDataPerformance] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchData = useCallback(async () => {
    const response = await getReportRevenueCourse(0, selectedCourse || 0);
    if (response?.data?.data?.courseRevenue) {
      setChartData(
        response.data.data.courseRevenue.map((item: any) => ({
          label: item.courseName,
          revenue: item.revenue,
          enrollmentCount: item.enrollmentCount,
        }))
      );
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchCourses = useCallback(async () => {
    const response = await getPaginatedCoursesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [
        {
          key: "status",
          condition: "equal",
          value: CourseStatus.APPROVED,
        },
      ],
      sortOrder: "",
      searchKey: "",
      searchFields: [],
      includeReferences: [],
    });
    if (response.data.data) {
      const listCourses = response.data.data.map((course: any) => ({
        label: course.courseName,
        value: course.id,
      }));
      setCourses(listCourses);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (role !== UserRole.ADMIN) {
      router.push("/");
      toast.error("Bạn không có quyền truy cập vào trang này");
    }
  }, [router, role]);

  const fetchDataPerformance = useCallback(async () => {
    const response = await getReportPerformanceService(selectedCourse);
    console.log(response);
    if (response?.data?.data) {
      setChartDataPerformance(
        response.data.data.map((item: any) => ({
          label: item.studentName,
          performance: item.completionRate,
        }))
      );
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      fetchDataPerformance();
    }
  }, [fetchDataPerformance, selectedCourse]);

  return (
    <div className="p-6 space-y-4">
      <div>
        <div className="mb-2 text-lg font-semibold">Chọn khóa học</div>
        <div className="w-full md:w-[300px]">
          <Combobox
            options={courses}
            value={selectedCourse}
            onChange={setSelectedCourse}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <BarChartComponent
            title="Doanh thu"
            chartData={chartData}
            chartConfig={chartConfigRevenue}
          />
        </div>
        <div className="col-span-1">
          <BarChartComponent
            title="Số lượng đăng ký"
            chartData={chartData}
            chartConfig={chartConfigEnrollmentCount}
          />
        </div>
        <div className="col-span-1">
          <BarChartComponent
            title="Hiệu suất học tập"
            chartData={chartDataPerformance}
            chartConfig={chartConfigPerformance}
          />
        </div>
      </div>
    </div>
  );
}
