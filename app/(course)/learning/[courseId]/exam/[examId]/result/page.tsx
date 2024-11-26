"use client";

import { Certificate } from "@/components/certificate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCourseByIdService } from "@/services/course.service";
import { getExamResultService } from "@/services/exam.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const LearningCourseIdExamIdResultPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore.getState();
  const { courseId, examId } = params;
  const [results, setResults] = useState<any>([]);
  const [attemptResult, setAttemptResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<number | null>(null);
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const certificateRef = useRef<any>(null);

  const getExamResult = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getExamResultService(
        Number(examId),
        Number(user?.student?.id)
      );
      if (response) {
        setResults(response.data);
        const attemptNumber = searchParams.get("attemptNumber");
        if (attemptNumber) {
          setSelectedAttempt(Number(attemptNumber));
          const attempt = response.data.find(
            (item: any) => item.attemptNumber === Number(attemptNumber)
          );
          setAttemptResult(attempt);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [examId, user, searchParams]);

  useEffect(() => {
    if (examId) {
      getExamResult();
    }
  }, [examId, getExamResult]);

  const getCourseDetail = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      if (response) {
        setCourseDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId && attemptResult?.isPassed) {
      getCourseDetail();
    }
  }, [courseId, getCourseDetail, attemptResult]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 animate-spin border-primary"></div>
      </div>
    );
  }

  const showAttemptResult = (attemptNumber: number) => {
    router.push(
      `/learning/${courseId}/exam/${examId}/result?attemptNumber=${attemptNumber}`
    );
  };

  return (
    <>
      <div className="px-4 py-8 mx-auto">
        {attemptResult && (
          <div className="p-6 mx-auto max-w-2xl rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="mb-6 text-3xl font-bold text-center">
                Kết quả bài kiểm tra
              </h1>
              {attemptResult.isPassed && (
                <Dialog>
                  <DialogTrigger>Xem chứng chỉ</DialogTrigger>
                  <DialogContent className="max-w-fit">
                    <DialogHeader>
                      <DialogTitle>Chứng chỉ của bạn</DialogTitle>
                      <DialogDescription>
                        Bạn đã xuất sắc hoàn thành khóa học này! Đây là chứng
                        chỉ của bạn.
                      </DialogDescription>
                    </DialogHeader>
                    <Certificate
                      ref={certificateRef}
                      courseName={courseDetail?.courseName}
                      userName={user?.fullName}
                      instructorName={courseDetail?.createdBy}
                    />
                    <DialogFooter>
                      <Button
                        variant="default"
                        onClick={() =>
                          certificateRef.current?.downloadCertificate()
                        }
                      >
                        Tải chứng chỉ
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`mb-2 text-6xl font-bold border-8 rounded-full w-48 h-48 flex items-center justify-center mx-auto ${
                    attemptResult.isPassed
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  }`}
                >
                  {attemptResult.score}%
                </div>
                <p
                  className={
                    attemptResult.isPassed ? "text-green-600" : "text-red-600"
                  }
                >
                  {attemptResult.isPassed
                    ? "Chúc mừng! Bạn đã vượt qua bài kiểm tra!"
                    : "Cố gắng học tập để cải thiện điểm số của bạn."}
                </p>
                {attemptResult.completedAt && (
                  <p className="">
                    {`Thực hiện vào ${new Date(
                      attemptResult.completedAt
                    ).toLocaleString()}`}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex justify-center items-center p-4 rounded">
                  <p className="mr-2 text-sm">Đáp án đúng</p>
                  <p className="text-2xl font-bold">
                    {attemptResult.correctAnswers}
                  </p>
                </div>
                <div className="flex justify-center items-center p-4 rounded">
                  <p className="mr-2 text-sm">Đáp án sai</p>
                  <p className="text-2xl font-bold">
                    {attemptResult.incorrectAnswers}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">
                  Chi tiết câu trả lời
                </h3>
                <div className="space-y-4">
                  {attemptResult.result?.map((question: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Câu hỏi {index + 1}</span>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            question.isCorrect
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {question.isCorrect ? "Đúng" : "Sai"}
                        </span>
                      </div>
                      <p className="mb-2">{question.content}</p>
                      <div className="mb-4">
                        {question.options.map(
                          (option: string, optionIndex: number) => (
                            <div
                              key={optionIndex}
                              className={`p-2 my-1 rounded-md border ${
                                option === question.correctAnswer
                                  ? "border-green-500"
                                  : option === question.userAnswer
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                            >
                              {option}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/learning/${courseId}`)}
                >
                  Quay lại khóa học
                </Button>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push(`/learning/${courseId}/exam/${examId}`)
                  }
                >
                  Làm lại bài kiểm tra
                </Button>
              </div>
            </div>
          </div>
        )}
        {!loading && (
          <div className="flex flex-col justify-center items-center mt-4">
            <h2 className="mb-6 text-2xl font-bold">Lịch sử làm bài</h2>
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="">
                    <th className="p-3 text-left border">Lần thử</th>
                    <th className="p-3 text-left border">Điểm số</th>
                    <th className="p-3 text-left border">Số câu đúng</th>
                    <th className="p-3 text-left border">Số câu sai</th>
                    <th className="p-3 text-left border">Kết quả</th>
                    <th className="p-3 text-left border">Thời gian làm bài</th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    ?.sort(
                      (a: any, b: any) => b.attemptNumber - a.attemptNumber
                    )
                    .map((result: any, index: number) => (
                      <tr
                        key={index}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          result.attemptNumber === selectedAttempt
                            ? "bg-sky-100 text-[#000]"
                            : ""
                        }`}
                        onClick={() => showAttemptResult(result.attemptNumber)}
                      >
                        <td className="p-3 border">{result.attemptNumber}</td>
                        <td className="p-3 border">{result.score}%</td>
                        <td className="p-3 border">{result.correctAnswers}</td>
                        <td className="p-3 border">
                          {result.incorrectAnswers}
                        </td>
                        <td className="p-3 border">
                          {result.isPassed ? "Đạt" : "Không đạt"}
                        </td>
                        <td className="p-3 border">
                          {new Date(result.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  {results.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-3 text-center border">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LearningCourseIdExamIdResultPage;
