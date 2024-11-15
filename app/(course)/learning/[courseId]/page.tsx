"use client";

import { getCourseByIdService } from "@/services/course.service";
import {
  getProgressByCourseId,
  markAsCompleted,
} from "@/services/progress.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VideoPlayer } from "./_components/video-player";
import { Button } from "@/components/ui/button";

const LearningCourseIdPage = () => {
  const params = useParams();
  const router = useRouter();
  const { courseId } = params;
  const searchParams = useSearchParams();

  const chapterId = searchParams.get("chapterId");
  const lessonId = searchParams.get("lessonId");
  const materialId = searchParams.get("materialId");

  // const [course, setCourse] = useState<any>({});
  const [material, setMaterial] = useState<any>(null);
  const fetchCourse = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      if (response.data) {
        // setCourse(response.data);

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
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [courseId, chapterId, lessonId, materialId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // useEffect(() => {
  //   getProgressByCourseId(Number(courseId)).then((res: any) => {
  //     console.log(res);
  //   });
  // }, [courseId]);

  const handleMarkAsCompleted = async () => {
    console.log("Mark as completed");
    try {
      const res = await markAsCompleted(Number(material?.id));
      console.log(res);
      if (window !== undefined) {
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleVideoEnded = () => {
    console.log("Video ended");
  };

  return material ? (
    <div className="flex flex-col pb-20 mx-auto">
      <div className="p-4">
        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer
            url={material?.materialURL ?? ""}
            onEnded={handleVideoEnded}
          />
        </Suspense>
        <div className="mt-4">
          <div className="flex items-center justify-between w-full gap-x-2">
            <h2 className="text-lg font-medium">Nội dung bài học</h2>
            <Button className="w-[200px]" onClick={handleMarkAsCompleted}>
              Đánh dấu hoàn thành
            </Button>
          </div>
          <p
            className="mt-4 text-sm text-gray-500"
            dangerouslySetInnerHTML={{
              __html: material?.materialDescription ?? "",
            }}
          ></p>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4">Chọn bài học để xem nội dung</div>
  );
};

export default LearningCourseIdPage;
