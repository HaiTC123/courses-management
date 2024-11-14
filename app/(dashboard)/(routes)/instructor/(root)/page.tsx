"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { UserRole } from "@/enum/user-role";
import { useAuthStore } from "@/store/use-auth-store";
import { BarChartComponent } from "@/components/chart";
import { useEffect, useState } from "react";
import { getReportRevenueCourse } from "@/services/report.service";
import { ChartConfig } from "@/components/ui/chart";
import { Monitor } from "lucide-react";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "July", desktop: 214, mobile: 140 },
//   { month: "August", desktop: 214, mobile: 140 },
//   { month: "September", desktop: 214, mobile: 140 },
//   { month: "October", desktop: 214, mobile: 140 },
//   { month: "November", desktop: 209, mobile: 140 },
//   { month: "December", desktop: 214, mobile: 130 },
// ];

const chartConfig = {
  revenue: {
    label: "Doanh thu (100,000 VNĐ)",
    color: "#2563eb",
  },
  enrollmentCount: {
    label: "Số lượng đăng ký",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function InstructorDashboard() {
  const role = useAuthStore((state) => state.role);
  const router = useRouter();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReportRevenueCourse();
      if (response?.data?.data?.courseRevenue) {
        setChartData(
          response.data.data.courseRevenue.map((item: any) => ({
            label: item.courseName,
            revenue: Math.round(item.revenue / 100000),
            enrollmentCount: item.enrollmentCount,
          }))
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (role !== UserRole.INSTRUCTOR) {
      router.push("/");
      toast.error("Bạn không có quyền truy cập vào trang này");
    }
  }, [router, role]);

  return (
    <div className="p-6 space-y-4">
      <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
    </div>
  );
}
