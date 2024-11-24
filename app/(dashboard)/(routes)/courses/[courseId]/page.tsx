"use client";

import { Button } from "@/components/ui/button";
import {
  buyCourseService,
  getCourseByIdService,
  registerCourseService,
} from "@/services/course.service";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ChapterDetail } from "./_components/chapter-detail";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Expand, MinusCircle, PlusCircle } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/use-auth-store";
import { DEFAULT_IMAGE } from "@/constants/default-image";
import { getPaginatedPrerequisitesService } from "@/services/prerequisite.service";
import Link from "next/link";
import { getProgressByCourseId } from "@/services/progress.service";
import { Certificate } from "@/components/certificate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
                  <MinusCircle className="w-4 h-4 mr-2" />
                ) : (
                  <PlusCircle className="w-4 h-4 mr-2" />
                )}
                <h2 className="text-xl font-bold">Các chương học</h2>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="max-h-full ml-10">
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
                    className="w-full mt-4"
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full mt-4"
                      >
                        Xem chứng chỉ
                      </Button>
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
                </>
              )}
            </>
          ) : course.isFree ? (
            <Button className="w-full mt-4" onClick={handleRegister}>
              Đăng ký học
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full mt-4">Mua và đăng ký khóa học</Button>
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
