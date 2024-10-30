import { IconBadge } from "@/components/icon-badge";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterDetailForm } from "./_components/chapter-detail-form";
import { LessonForm } from "./_components/lesson-form";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = { userId: "123" };

  const { courseId, chapterId } = params;

  const course: any = {
    chapterTitle: "Chapter 1",
    chapterDescription: "This is the first chapter",
    lessons: [
      {
        id: "1",
        title: "Lesson 1",
        description: "Lesson 1 description",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isPublished: true,
        isFree: false,
      },
      {
        id: "2",
        title: "Lesson 2",
        description: "Lesson 2 description",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isPublished: true,
        isFree: false,
      },
      {
        id: "3",
        title: "Lesson 3",
        description: "Lesson 3 description",
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
            href={`/instructor/courses/${courseId}`}
            className="flex items-center mb-6 text-sm hover:opacity-75"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Trở về cấu hình khóa học
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Cấu hình chương học</h1>
              <p className="text-sm text-slate-500">
                Hãy đặt tên và mô tả cho chương học của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex item-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh chương học</h2>
                </div>

                <ChapterDetailForm
                  initialData={course}
                  courseId={courseId}
                  chapterId={chapterId}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">Tùy chỉnh bài học</h2>
                </div>
                <LessonForm
                  initialData={course}
                  courseId={courseId}
                  chapterId={chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
