"use client";

import { IconBadge } from "@/components/icon-badge";
import { getCourseByIdService } from "@/services/course.service";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LessonDetailForm } from "./_components/lesson-detail-form";
import { MaterialForm } from "./_components/material-form";

const AdminLessonIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string; lessonId: string };
}) => {
  const { courseId, chapterId, lessonId } = params;

  const [lesson, setLesson] = useState<any>(null);

  const fetchLesson = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      console.log("response", response);

      for (const chapter of response?.data?.chapters || []) {
        if (chapter.id !== Number(chapterId)) {
          continue;
        }
        const foundLesson = chapter?.lessons.find(
          (lesson: any) => lesson.id === Number(lessonId)
        );
        console.log("foundLesson", foundLesson);
        if (foundLesson) {
          setLesson(foundLesson);
          break;
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [courseId, chapterId, lessonId]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/admin/courses/${courseId}/chapters/${chapterId}`}
            className="flex items-center mb-6 text-sm hover:opacity-75"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Trở về cấu hình chương học
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Cấu hình bài học</h1>
              <p className="text-sm text-slate-500">
                Hãy đặt tên và mô tả cho bài học của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex item-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh thông tin bài học</h2>
                </div>

                <LessonDetailForm
                  initialData={lesson}
                  courseId={courseId}
                  chapterId={chapterId}
                  lessonId={lessonId}
                  onFetchLesson={fetchLesson}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">Tùy chỉnh video</h2>
                </div>
                <MaterialForm
                  initialData={lesson}
                  courseId={courseId}
                  chapterId={chapterId}
                  lessonId={lessonId}
                  onFetchLesson={fetchLesson}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLessonIdPage;
