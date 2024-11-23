"use client";

import { IconBadge } from "@/components/icon-badge";
import { getCourseByIdService } from "@/services/course.service";
import { ArrowLeftIcon, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ExamDetailForm } from "./_components/exam-detail-form";
import {
  getExamByIdService,
  getExamDetailService,
  getPaginatedExamsService,
} from "@/services/exam.service";
import { QuestionForm } from "./_components/question-form";

const ExamIdPage = ({
  params,
}: {
  params: { courseId: string; examId: string };
}) => {
  const { courseId, examId } = params;

  const [exam, setExam] = useState<any>(null);

  const fetchExam = useCallback(async () => {
    try {
      const response = await getPaginatedExamsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "courseId",
            condition: "equal",
            value: Number(courseId),
          },
        ],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      const foundExam = response?.data?.data?.find(
        (exam: any) => exam.id === Number(examId)
      );
      if (foundExam) {
        setExam(foundExam);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [courseId, examId]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

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
              <h1 className="text-2xl font-medium">Cấu hình bài kiểm tra</h1>
              <p className="text-sm text-slate-500">
                Hãy đặt tên và mô tả cho bài kiểm tra của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh bài kiểm tra</h2>
                </div>

                <ExamDetailForm
                  initialData={exam}
                  courseId={courseId}
                  examId={examId}
                  onFetchExam={fetchExam}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">Tùy chỉnh câu hỏi</h2>
                </div>
                <QuestionForm
                  initialData={exam}
                  courseId={courseId}
                  examId={examId}
                  onFetchExam={fetchExam}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamIdPage;
