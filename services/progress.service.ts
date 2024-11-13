import axiosInstance from "@/lib/axios-instance";

export const getProgress = async (courseLessonId: number) => {
  const response = await axiosInstance.put("/api/learnpath/progress", {
    courseLessonId,
  });
  return response.data;
};

export const getProgressByCourseId = async (courseId: number) => {
  const response = await axiosInstance.get(
    `/api/progress/${courseId}/progress`
  );
  return response.data;
};
