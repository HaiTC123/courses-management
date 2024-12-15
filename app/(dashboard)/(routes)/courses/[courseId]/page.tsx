"use client";

import { Certificate } from "@/components/certificate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DEFAULT_IMAGE } from "@/constants/default-image";
import { formatPrice } from "@/lib/format";
import {
  buyCourseService,
  getCourseByIdService,
  registerCourseService,
} from "@/services/course.service";
import {
  getExamResultService,
  getPaginatedExamsService,
} from "@/services/exam.service";
import { getPaginatedPrerequisitesService } from "@/services/prerequisite.service";
import { getProgressByCourseId } from "@/services/progress.service";
import { useAuthStore } from "@/store/use-auth-store";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ChapterDetail } from "./_components/chapter-detail";

const CourseIdPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user, getCurrentUser } = useAuthStore.getState();
  const [isOpen, setIsOpen] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const certificateRef = useRef<any>(null);
  const { courseId } = params;

  const [course, setCourse] = useState<any>({});

  const fetchCourse = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      if (response.data) {
        setCourse(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  useEffect(() => {
    if (user.enrolledCourseIds) {
      const courseIds =
        user.enrolledCourseIds
          .split(";")
          .map((course: any) => Number(course)) ?? [];
      setEnrolledCourseIds(courseIds);
    }
  }, [user]);

  const [prerequisiteCourses, setPrerequisiteCourses] = useState<any>(null);
  const fetchPrerequisites = useCallback(async () => {
    try {
      const response = await getPaginatedPrerequisitesService({
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
        includeReferences: {
          prerequisiteCourse: true,
        },
      });
      if (response?.data?.data?.length > 0) {
        const listPrerequisites = response.data.data.map(
          (prerequisite: any) => ({
            ...prerequisite,
          })
        );
        setPrerequisiteCourses(listPrerequisites[0]?.prerequisiteCourse);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchPrerequisites();
    }
  }, [courseId, fetchPrerequisites]);

  const [exam, setExam] = useState<any>(null);
  const [results, setResults] = useState<any>([]);

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
      if (response?.data?.data?.length > 0) {
        setExam(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchExam();
    }
  }, [courseId, fetchExam]);

  const getExamResult = useCallback(async () => {
    try {
      const response = await getExamResultService(
        Number(exam.id),
        Number(user?.student?.id)
      );
      if (response) {
        setResults(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [exam, user]);

  useEffect(() => {
    if (exam?.id) {
      getExamResult();
    }
  }, [exam, getExamResult]);

  const handleRegister = async () => {
    if (course.isFree) {
      try {
        const response = await registerCourseService(Number(courseId), 2);
        const response2 = await getCurrentUser();
        if (response.success && response2.success) {
          toast.success("Đăng ký học thành công");
          router.push(`/learning/${courseId}`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await buyCourseService(Number(courseId), 2);
        const response2 = await registerCourseService(Number(courseId), 2);
        const response3 = await getCurrentUser();
        if (response && response2 && response3) {
          toast.success("Mua và đăng ký khóa học thành công");
          router.push(`/learning/${courseId}`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleContinueLearning = () => {
    router.push(`/learning/${courseId}`);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (courseId) {
      getProgressByCourseId(Number(courseId)).then((res: any) => {
        if (res.data) {
          const completed = res.data.completed;
          const total = res.data.total || 1;
          setProgress(Math.round((completed / total) * 100));
        }
      });
    }
  }, [courseId]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-6">
          <div className="mt-2 mb-8">
            <h1 className="text-2xl font-bold">{course?.courseName}</h1>
            <p
              className="my-6"
              dangerouslySetInnerHTML={{
                __html: course?.description ?? "",
              }}
            ></p>
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center cursor-pointer">
                {isOpen ? (
                  <MinusCircle className="mr-2 w-4 h-4" />
                ) : (
                  <PlusCircle className="mr-2 w-4 h-4" />
                )}
                <h2 className="text-xl font-bold">Các chương học</h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-10 max-h-full">
              {course?.chapters?.map((chapter: any, index: number) => (
                <ChapterDetail
                  key={chapter.id}
                  title={`${index + 1}. ${chapter.chapterTitle}`}
                  description={chapter.chapterDescription}
                  lessons={chapter.lessons}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="p-6">
          <Image
            src={course?.backgroundUrl ?? DEFAULT_IMAGE}
            alt="Background Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
              borderRadius: "10px",
            }}
          />
          {course.isFree ? (
            <h3 className="p-4 text-xl font-bold text-center">Miễn phí</h3>
          ) : (
            <h3 className="p-4 text-xl font-bold text-center">
              Giá: {formatPrice(course.price)}
            </h3>
          )}
          {prerequisiteCourses && (
            <p>
              <strong>Môn tiên quyết:</strong>{" "}
              <Link href={`/courses/${prerequisiteCourses?.id}`}>
                <span
                  className="text-blue-600 truncate"
                  title={prerequisiteCourses?.courseName}
                >
                  {prerequisiteCourses?.courseName}
                </span>
              </Link>
            </p>
          )}
          {enrolledCourseIds.includes(Number(courseId)) ? (
            <>
              {progress < 100 && (
                <>
                  <h3 className="p-4 text-xl font-bold text-center">
                    Bạn đã đăng ký khóa học này
                  </h3>
                  <Button
                    className="mt-4 w-full"
                    onClick={handleContinueLearning}
                  >
                    Tiếp tục học
                  </Button>
                </>
              )}
              {progress === 100 && (
                <>
                  <h3 className="p-4 text-xl font-bold text-center">
                    Bạn đã hoàn thành khóa học này
                  </h3>
                  <Button
                    className="mt-4 w-full"
                    onClick={handleContinueLearning}
                  >
                    Xem lại khóa học
                  </Button>
                </>
              )}
              {results.length > 0 &&
                results.some((result: any) => result.isPassed) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 w-full">Xem chứng chỉ</Button>
                    </DialogTrigger>
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
                        courseName={course?.courseName}
                        userName={user?.fullName}
                        instructorName={course?.createdBy}
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
            </>
          ) : course.isFree ? (
            <Button className="mt-4 w-full" onClick={handleRegister}>
              Đăng ký học
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="mt-4 w-full">Mua và đăng ký khóa học</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn sẽ mua khóa học và đăng ký khóa học này.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRegister}>
                    Mua và đăng ký
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
