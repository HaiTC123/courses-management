"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  getExamDetailService,
  submitExamService,
} from "@/services/exam.service";
import { isNumber } from "lodash";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LearningCourseIdExamIdPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { courseId, examId } = params;
  const [exam, setExam] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const getExamDetail = useCallback(async () => {
    try {
      const response = await getExamDetailService(Number(examId));
      if (response?.data) {
        setExam(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [examId]);

  useEffect(() => {
    if (examId) {
      getExamDetail();
    }
  }, [examId, getExamDetail]);

  useEffect(() => {
    if (isNumber(currentQuestionIndex)) {
      router.replace(
        `/learning/${courseId}/exam/${examId}?question=${currentQuestionIndex}`
      );
    }
  }, [courseId, currentQuestionIndex, examId, router]);

  useEffect(() => {
    if (searchParams.get("question")) {
      setCurrentQuestionIndex(Number(searchParams.get("question")));
    }
  }, [searchParams]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (exam?.questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (value: string, questionId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const currentQuestion = exam?.questions?.[currentQuestionIndex];

  const handleSubmitExam = async () => {
    console.log(selectedAnswers);
    try {
      const response = await submitExamService(Number(examId), selectedAnswers);
      if (response) {
        toast.success("Nộp bài thành công");
        router.push(
          `/learning/${courseId}/exam/${examId}/result?attemptNumber=${response.data.attemptNumber}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (exam) {
      console.log(exam);
    }
  }, [exam]);

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">{exam?.title}</h1>
        <Button variant="outline">
          <Link href={`/learning/${courseId}/exam/${examId}/result`}>
            Xem kết quả
          </Link>
        </Button>
      </div>
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: exam?.description ?? "" }}
      ></p>

      <div className="flex flex-wrap gap-2 mb-6">
        {exam?.questions?.map((question: any, index: number) => (
          <Button
            key={index}
            variant={currentQuestionIndex === index ? "default" : "outline"}
            className={cn(
              "w-10 h-10 m-1",
              currentQuestionIndex === index &&
                "border-dashed border-yellow-500 border-2",
              selectedAnswers[question.id] &&
                "bg-green-500 hover:bg-green-600 text-white"
            )}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {currentQuestion && (
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Câu hỏi {currentQuestionIndex + 1} trên {exam?.questions?.length}
            </h2>
            <p className="mb-4">{currentQuestion.content}</p>

            <RadioGroup
              value={selectedAnswers[currentQuestion.id] ?? null}
              onValueChange={(value) =>
                handleAnswerSelect(value, currentQuestion.id)
              }
              className="space-y-3"
            >
              {currentQuestion?.options?.map((option: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`question-${currentQuestion.id}-answer-${index}`}
                  />
                  <Label
                    htmlFor={`question-${currentQuestion.id}-answer-${index}`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            {currentQuestionIndex > 0 ? (
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Câu hỏi trước
              </Button>
            ) : (
              <div></div>
            )}
            {currentQuestionIndex < (exam?.questions?.length ?? 0) - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === exam.questions.length - 1}
              >
                Câu hỏi tiếp theo
              </Button>
            ) : (
              <Button onClick={handleSubmitExam}>Nộp bài</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningCourseIdExamIdPage;
