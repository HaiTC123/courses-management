"use client";

import { LayoutDashboard, ListChecks } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { getCourseByIdService } from "@/services/course.service";
import { useEffect, useState, useCallback } from "react";
import { getLearningPathByIdService } from "@/services/learn-path.service";
import { LearningPathForm } from "./_components/learning-path-form";
import { CourseForm } from "./_components/course-form";
import toast from "react-hot-toast";
// import { ChapterForm } from "./_components/chapter-form";
// import { CourseForm } from "./_components/course-form";

const LearningPathIdPage = ({
  params,
}: {
  params: {
    learningPathId: string;
  };
}) => {
  const { learningPathId } = params;

  const [learningPath, setLearningPath] = useState<any>({});

  const fetchLearningPath = useCallback(async () => {
    try {
      const response = await getLearningPathByIdService(Number(learningPathId));
      if (response.data) {
        console.log(response.data);
        setLearningPath(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [learningPathId]);

  useEffect(() => {
    fetchLearningPath();
  }, [fetchLearningPath]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Cấu hình lộ trình học</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Tùy chỉnh lộ trình học</h2>
          </div>
          <LearningPathForm
            initialData={learningPath}
            learningPathId={learningPathId}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Tùy chỉnh khóa học</h2>
            </div>
            <CourseForm
              initialData={learningPath}
              learningPathId={learningPathId}
              onFetchLearningPath={fetchLearningPath}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LearningPathIdPage;
