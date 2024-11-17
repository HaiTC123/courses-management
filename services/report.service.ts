import axiosInstance from "@/lib/axios-instance";

// Báo cáo xem hiệu xuất của sv tham gia 1 khóa học hoàn thành bao nhiêu %
export const getReportPerformanceService = async (courseId: number) => {
  return await axiosInstance.get(`/api/course/student/performance/${courseId}`);
};

// Doanh thu khóa học mất phí
/**
 * @param instructorId - ID của giáo viên (0 nếu lấy tất cả)
 * @param courseId - ID của khóa học (0 nếu lấy tất cả)
 * @returns
 */
export const getReportRevenueCourse = async (
  instructorId: number = 0,
  courseId: number = 0
) => {
  return await axiosInstance.get(
    `/api/course/instructor/revenue/${instructorId}/${courseId}`
  );
};
