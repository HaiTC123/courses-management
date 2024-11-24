"use client";

import { getPaginatedCoursesService } from "@/services/course.service";
import {
  getExamResultService,
  getPaginatedExamsService,
} from "@/services/exam.service";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/use-auth-store";
import { useCallback, useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { CourseStatus } from "@/enum/course-status";
import { getPaginatedStudentsService } from "@/services/user.service";

const ExamPage = () => {
  const [results, setResults] = useState<any>([]);
  const [examId, setExamId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const { user } = useAuthStore.getState();
  const getExamResult = useCallback(
    async (examId: number, studentId: number) => {
      try {
        const response = await getExamResultService(
          Number(examId),
          Number(studentId)
        );
        if (response) {
          setResults(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (examId && studentId) {
      getExamResult(examId, studentId);
    }
  }, [examId, studentId, getExamResult]);

  const [exams, setExams] = useState<any[]>([]);
  const fetchCourses = useCallback(() => {
    getPaginatedCoursesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [
        {
          key: "instructorId",
          condition: "equal",
          value: user.instructor.id,
        },
        {
          key: "status",
          condition: "equal",
          value: CourseStatus.APPROVED,
        },
      ],
      sortOrder: "",
      searchKey: "",
      searchFields: [],
      includeReferences: {},
    })
      .then((response) => {
        if (response.data.data) {
          const listCourses = response.data.data;
          console.log(listCourses);
          Promise.all(
            listCourses.map((course: any) =>
              getPaginatedExamsService({
                pageSize: 1000,
                pageNumber: 1,
                conditions: [
                  {
                    key: "courseId",
                    condition: "equal",
                    value: Number(course.id),
                  },
                ],
                sortOrder: "",
                searchKey: "",
                searchFields: [],
                includeReferences: {},
              })
            )
          ).then((responses) => {
            responses.forEach((response: any) => {
              if (response.data.data) {
                const exams = response.data.data.map((exam: any) => ({
                  label: listCourses.find((c: any) => c.id === exam.courseId)
                    ?.courseName,
                  value: exam.id,
                }));
                setExams((prev) => [...prev, ...exams]);
              }
            });
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [user]);

  useEffect(() => {
    if (user?.instructor?.id) {
      fetchCourses();
    }
  }, [user, fetchCourses]);

  const [users, setUsers] = useState<any>([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getPaginatedStudentsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {
          user: true,
        },
      });
      if (response?.data?.data) {
        const listStudents = response.data.data.map((student: any) => ({
          label: student.user.fullName,
          value: student.id,
        }));
        setUsers(listStudents);
      }
    } catch (error) {
      toast.error("Lấy danh sách sinh viên thất bại");
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Combobox options={exams} value={examId} onChange={setExamId} />
        <Combobox options={users} value={studentId} onChange={setStudentId} />
      </div>

      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-full overflow-x-auto">
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
                ?.sort((a: any, b: any) => b.attemptNumber - a.attemptNumber)
                .map((result: any, index: number) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-50 hover:text-black`}
                  >
                    <td className="p-3 border">{result.attemptNumber}</td>
                    <td className="p-3 border">{result.score}%</td>
                    <td className="p-3 border">{result.correctAnswers}</td>
                    <td className="p-3 border">{result.incorrectAnswers}</td>
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
    </div>
  );
};

export default ExamPage;
