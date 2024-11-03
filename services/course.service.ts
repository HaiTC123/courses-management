import axiosInstance from "@/lib/axios-instance";

export interface ICondition {
  key: string;
  condition: string;
  value: string | number;
}

export interface IGetPaginatedCoursesParams {
  pageSize: number;
  pageNumber: number;
  conditions: ICondition[];
  sortOrder: string;
  searchKey: string;
  searchFields: string[];
  includeReferences: any;
}

export const getPaginatedCoursesService = async (
  params: IGetPaginatedCoursesParams
) => {
  const response = await axiosInstance.post("/api/course/paging", params);
  return response.data;
};

//#region Course
export const addCourseService = async (data: any) => {
  const response = await axiosInstance.post("/api/course", data);
  return response.data;
};

export const updateCourseService = async (courseId: number, data: any) => {
  const response = await axiosInstance.put(`/api/course/${courseId}`, data);
  return response.data;
};

export const getCourseByIdService = async (courseId: number) => {
  const response = await axiosInstance.get(`/api/course/detail/${courseId}`);
  return response.data;
};
//#endregion

//#region Chapter
export const addChapterService = async (data: any) => {
  const response = await axiosInstance.post("/api/courseChapters", data);
  return response.data;
};

export const updateChapterService = async (chapterId: number, data: any) => {
  const response = await axiosInstance.put(
    `/api/courseChapters/${chapterId}`,
    data
  );
  return response.data;
};

export const getChapterByIdService = async (body: any) => {
  const response = await axiosInstance.post(`/api/courseChapters/paging`, body);
  return response.data;
};

//#region Lesson
export const addLessonService = async (data: any) => {
  const response = await axiosInstance.post("/api/courseLessons", data);
  return response.data;
};

export const updateLessonService = async (lessonId: number, data: any) => {
  const response = await axiosInstance.put(
    `/api/courseLessons/${lessonId}`,
    data
  );
  return response.data;
};
//#endregion

//#region Material
export const addMaterialService = async (data: any) => {
  const response = await axiosInstance.post("/api/courseMaterials", data);
  return response.data;
};

export const updateMaterialService = async (materialId: number, data: any) => {
  const response = await axiosInstance.put(
    `/api/courseMaterials/${materialId}`,
    data
  );
  return response.data;
};
//#endregion

export const sendToAdminApproveService = async (courseId: number) => {
  const response = await axiosInstance.put(
    `/api/course/sendToAdmin/${courseId}`
  );
  return response.data;
};

export const checkCourseService = async (courseId: number, status: string) => {
  const response = await axiosInstance.put(
    `/api/course/updateStatus/${courseId}`,
    {
      status,
    }
  );
  return response.data;
};
