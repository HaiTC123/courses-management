"use client";

import { BarChartComponent } from "@/components/chart";
import { UserRole } from "@/enum/user-role";
import { getReportRevenueCourse } from "@/services/report.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChartConfig } from "@/components/ui/chart";

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

export default function AdminDashboard() {
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

  if (role !== UserRole.ADMIN) {
    router.push("/");
    toast.error("Bạn không có quyền truy cập vào trang này");
    return null;
  }

  return (
    <div className="h-full p-6">
      <h1 className="py-2 text-2xl font-bold">Biểu đồ thống kê</h1>
      <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
    </div>
  );
}
