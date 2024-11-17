"use client";

import { getCourseByIdService } from "@/services/course.service";
import { getPaginatedEnrollmentsService } from "@/services/enrollment.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { courseId } = params;
  const authenticated = useAuthStore.getState().authenticated;
  const user = useAuthStore.getState().user;
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  const [course, setCourse] = useState<any>({});
  const [enrollmentId, setEnrollmentId] = useState(0);

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
      if (courseId && !courseIds.includes(Number(courseId))) {
        toast.error("Bạn chưa đăng ký khóa học này");
        router.push("/");
      }
    }
  }, [courseId, router, user]);

  useEffect(() => {
    const fetchEnrollment = async () => {
      const response = await getPaginatedEnrollmentsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "courseId",
            condition: "equal",
            value: Number(courseId),
          },
          {
            key: "studentId",
            condition: "equal",
            value: user?.student?.id,
          },
        ],
        sortOrder: "createdAt desc",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      if (response?.data?.data?.length > 0) {
        setEnrollmentId(response.data.data[0].id);
      }
    };
    if (courseId && user?.student?.id) {
      fetchEnrollment();
    }
  }, [courseId, user]);

  useEffect(() => {
    setDomLoaded(true);
    if (!authenticated) {
      router.push("/sign-in");
    }
  }, [authenticated, router]);

  return (
    <>
      {domLoaded && (
        <div className="w-full h-full">
          <div className="h-[80px] md:pl-80 fixed inset-y-0 z-50 w-full">
            <CourseNavbar course={course} enrollmentId={enrollmentId} />
          </div>
          <div className="fixed inset-y-0 z-50 flex-col hidden h-full md:flex w-80">
            <CourseSidebar course={course} enrollmentId={enrollmentId} />
          </div>
          <main className="h-full md:pl-80 md:pt-[80px]">{children}</main>
        </div>
      )}
    </>
  );
};

export default CourseIdLayout;
