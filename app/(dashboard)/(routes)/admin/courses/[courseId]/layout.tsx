"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseStatus } from "@/enum/course-status";
import { UserRole } from "@/enum/user-role";
import {
  checkCourseService,
  getCourseByIdService,
} from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminCourseDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}) => {
  const { role } = useAuthStore.getState();
  const router = useRouter();
  const { courseId } = params;

  useEffect(() => {
    if (role !== UserRole.ADMIN) {
      toast.error("Bạn không có quyền truy cập vào trang này");
      router.push("/");
    }
  }, [router, role]);

  const [course, setCourse] = useState<any>({});

  // const fetchCourse = useCallback(async () => {
  //   try {
  //     const response = await getCourseByIdService(Number(courseId));
  //     if (response.data) {
  //       setCourse(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching course:", error);
  //   }
  // }, [courseId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseByIdService(Number(courseId));
        if (response.data) {
          setCourse(response.data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleCheckCourse = async (status: string) => {
    try {
      await checkCourseService(Number(courseId), status);
      toast.success("Cập nhật trạng thái thành công");
      router.refresh();
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  return (
    <>
      <div className="flex items-center justify-end w-full p-3">
        {course.status === CourseStatus.PENDING_APPROVAL && (
          <>
            <Button
              variant="default"
              className="mr-2"
              onClick={() => handleCheckCourse(CourseStatus.APPROVED)}
            >
              Phê duyệt
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCheckCourse(CourseStatus.REJECTED)}
            >
              Từ chối
            </Button>
          </>
        )}
        {course.status === CourseStatus.APPROVED && (
          <Badge className="bg-green-500">Khóa học đã phê duyệt</Badge>
        )}
        {course.status === CourseStatus.REJECTED && (
          <Badge className="bg-red-500">Khóa học đã từ chối</Badge>
        )}
      </div>
      {children}
    </>
  );
};

export default AdminCourseDetailLayout;
