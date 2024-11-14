"use client";

import { LayoutDashboard, ListChecks } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { getCourseByIdService } from "@/services/course.service";
import { useEffect, useState, useCallback } from "react";
import { ChapterForm } from "./_components/chapter-form";
import { CourseForm } from "./_components/course-form";

const AdminCourseIdPage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { courseId } = params;

  const [course, setCourse] = useState<any>({});

  const fetchCourse = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      if (response.data) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Cấu hình khóa học</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Tùy chỉnh khóa học</h2>
          </div>
          <CourseForm initialData={course} courseId={courseId} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Tùy chỉnh chương học</h2>
            </div>
            <ChapterForm
              initialData={course}
              courseId={courseId}
              onFetchCourse={fetchCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCourseIdPage;
