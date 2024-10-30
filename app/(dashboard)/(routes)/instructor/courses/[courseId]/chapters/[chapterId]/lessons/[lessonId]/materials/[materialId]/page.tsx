import { IconBadge } from "@/components/icon-badge";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MaterialDetailForm } from "./_components/material-detail-form";
// import { MaterialForm } from "./_components/material-form";
// import { ChapterDetailForm } from "./_components/chapter-detail-form";
// import { LessonForm } from "../../_components/lesson-form";

const LessonIdPage = ({
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

  const course: any = {
    chapterTitle: "Chapter 1",
    chapterDescription: "This is the first chapter",
    materials: [
      {
        id: "1",
        title: "Material 1",
        description: "Material 1 description",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isPublished: true,
        isFree: false,
      },
      {
        id: "2",
        title: "Material 2",
        description: "Material 2 description",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isPublished: true,
        isFree: false,
      },
      {
        id: "3",
        title: "Material 3",
        description: "Material 3 description",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isPublished: true,
        isFree: false,
      },
    ],
  };

  if (!userId) {
    return redirect("/");
  }

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
                  initialData={course}
                  courseId={courseId}
                  chapterId={chapterId}
                  lessonId={lessonId}
                  materialId={materialId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonIdPage;
