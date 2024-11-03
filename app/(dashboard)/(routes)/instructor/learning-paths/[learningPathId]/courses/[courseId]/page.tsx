"use client";

import { IconBadge } from "@/components/icon-badge";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CourseDetailForm } from "./_components/course-detail-form";
import { useCallback, useEffect, useState } from "react";
import { getCourseByIdService } from "@/services/course.service";
import { getLearningPathByIdService } from "@/services/learn-path.service";

const LearnCourseIdPage = ({
  params,
}: {
  params: {
    learningPathId: string;
    courseId: string;
  };
}) => {
  const { learningPathId, courseId } = params;

  const [course, setCourse] = useState<any>(null);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await getLearningPathByIdService(Number(learningPathId));
      console.log("response", response);

      for (const course of response?.data?.courses || []) {
        if (course.id !== Number(courseId)) {
          continue;
        }
        course.courseId = course.courseId.toString();
        console.log("course", course);
        setCourse(course);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [learningPathId, courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/instructor/learning-paths/${learningPathId}`}
            className="flex items-center mb-6 text-sm hover:opacity-75"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Trở về cấu hình lộ trình học
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Cấu hình khóa học</h1>
              <p className="text-sm text-slate-500">
                Hãy đặt tên và mô tả cho khóa học của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex item-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh khóa học</h2>
                </div>

                <CourseDetailForm
                  initialData={course}
                  learningPathId={learningPathId}
                  courseId={courseId}
                  onFetchCourse={fetchCourse}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnCourseIdPage;
