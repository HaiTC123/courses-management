"use client";

import { IconBadge } from "@/components/icon-badge";
import { getQuestionByIdService } from "@/services/question.service";
import { ArrowLeftIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { QuestionDetailForm } from "./_components/question-detail-form";

const QuestionIdPage = ({
  params,
}: {
  params: { courseId: string; examId: string; questionId: string }; 
}) => {
  const { courseId, examId, questionId } = params;

  const [question, setQuestion] = useState<any>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await getQuestionByIdService(Number(questionId));
      if (response?.data) {
        setQuestion(response?.data);
      }
    } catch (error) {
      toast.error("Lấy câu hỏi thất bại");
    }
  }, [questionId]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/instructor/courses/${courseId}/exams/${examId}`}
            className="flex items-center mb-6 text-sm hover:opacity-75"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Trở về cấu hình bài kiểm tra
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Cấu hình câu hỏi</h1>
              <p className="text-sm text-slate-500">
                Hãy tinh chỉnh thông tin câu hỏi của bạn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex item-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Tùy chỉnh thông tin câu hỏi</h2>
                </div>

                <QuestionDetailForm
                  initialData={question}
                  questionId={questionId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionIdPage;
