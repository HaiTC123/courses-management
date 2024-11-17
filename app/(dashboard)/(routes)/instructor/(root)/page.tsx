"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { BarChartComponent } from "@/components/chart";
import { useCallback, useEffect, useState } from "react";
import { getReportRevenueCourse } from "@/services/report.service";
import { ChartConfig } from "@/components/ui/chart";
import { Combobox } from "@/components/ui/combobox";
import { getPaginatedCoursesService } from "@/services/course.service";
import { CourseStatus } from "@/enum/course-status";

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

export default function InstructorDashboard() {
  const { role, user } = useAuthStore.getState();
  const router = useRouter();
  const [chartData, setChartData] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const fetchData = useCallback(async () => {
    const response = await getReportRevenueCourse(
      user.instructor.id,
      selectedCourse || 0
    );
    if (response?.data?.data?.courseRevenue) {
      setChartData(
        response.data.data.courseRevenue.map((item: any) => ({
          label: item.courseName,
          revenue: item.revenue,
          enrollmentCount: item.enrollmentCount,
        }))
      );
    }
  }, [user, selectedCourse]);

  useEffect(() => {
    if (user?.instructor?.id) {
      fetchData();
    }
  }, [user, fetchData]);

  const fetchCourses = useCallback(async () => {
    const response = await getPaginatedCoursesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [
        {
          key: "instructorId",
          condition: "equal",
          value: user.instructor.id,
        },
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
  }, [user]);

  useEffect(() => {
    if (user?.instructor?.id) {
      fetchCourses();
    }
  }, [user, fetchCourses]);

  useEffect(() => {
    if (role !== UserRole.INSTRUCTOR) {
      router.push("/");
      toast.error("Bạn không có quyền truy cập vào trang này");
    }
  }, [router, role]);

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
      </div>
    </div>
  );
}
