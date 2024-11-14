"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Clock } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const CourseSidebarItem = ({
  label,
  isLocked,
  isCompleted,
  courseId,
  chapterId,
  lessonId,
  materialId,
  progressDetails,
}: any) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const chapterIdParam = searchParams.get("chapterId");
  const lessonIdParam = searchParams.get("lessonId");
  const materialIdParam = searchParams.get("materialId");

  // useEffect(() => {
  //   const isMaterialCompleted = (progressDetails || []).find(
  //     (progress: any) =>
  //       progress.materialId === materialId && progress.status === "Completed"
  //   );
  //   setIsCompleted(isMaterialCompleted);

  //   const isMaterialLocked = (progressDetails || []).find(
  //     (progress: any) =>
  //       progress.materialId === materialId && progress.status === "NotStarted"
  //   );
  //   setIsLocked(isMaterialLocked);
  // }, [materialId, progressDetails]);

  useEffect(() => {
    console.log(progressDetails, 123);
    console.log(materialId, 123);
  }, [progressDetails, materialId]);

  const Icon: any = isLocked ? Lock : isCompleted ? CheckCircle : Clock;

  const isActive =
    chapterIdParam === chapterId.toString() &&
    lessonIdParam === lessonId.toString() &&
    materialIdParam === materialId.toString();

  const onClick = () => {
    router.push(
      `/learning/${courseId}?chapterId=${chapterId}&lessonId=${lessonId}&materialId=${materialId}`
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-300/50 rounded-md p-3 w-full",
        isActive && "text-sky-700 bg-sky-200/50 hover:bg-sky-200/50",
        isCompleted &&
          "text-emerald-700 bg-emerald-200/50 hover:bg-emerald-200/50",
        isCompleted && isActive && "bg-emerald-200/50 text-emerald-700"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icon
          className={cn(
            "h-4 w-4 mr-2 text-slate-500",
            isActive && "text-sky-700",
            isCompleted && "text-emerald-700"
          )}
          size={22}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 transition-all group-hover:opacity-100 border-slate-700 h-full",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      ></div>
    </button>
  );
};
