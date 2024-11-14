"use client";

import { IconBadge } from "@/components/icon-badge";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MaterialDetailForm } from "./_components/material-detail-form";
import { useCallback, useEffect, useState } from "react";
import { getCourseByIdService } from "@/services/course.service";
// import { MaterialForm } from "./_components/material-form";
// import { ChapterDetailForm } from "./_components/chapter-detail-form";
// import { LessonForm } from "../../_components/lesson-form";

const AdminMaterialIdPage = ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
    materialId: string;
  };
}) => {
  const { userId } = { userId: "123" };

  const { courseId, chapterId, lessonId, materialId } = params;

  const [material, setMaterial] = useState<any>(null);

  const fetchMaterial = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      console.log("response", response);

      for (const chapter of response?.data?.chapters || []) {
        if (chapter.id !== Number(chapterId)) {
          continue;
        }
        for (const lesson of chapter?.lessons || []) {
          if (lesson.id !== Number(lessonId)) {
            continue;
          }
          const foundMaterial = lesson?.materials.find(
            (material: any) => material.id === Number(materialId)
          );
          if (foundMaterial) {
            setMaterial(foundMaterial);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [courseId, chapterId, lessonId, materialId]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/instructor/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`}
            className="flex items-center mb-6 text-sm hover:opacity-75"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Trở về cấu hình bài học
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Cấu hình tài liệu</h1>
              <p className="text-sm text-slate-500">
                Hãy đặt tên và mô tả cho tài liệu của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex item-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh tài liệu</h2>
                </div>

                <MaterialDetailForm
                  initialData={material}
                  courseId={courseId}
                  chapterId={chapterId}
                  lessonId={lessonId}
                  materialId={materialId}
                  onFetchMaterial={fetchMaterial}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMaterialIdPage;
