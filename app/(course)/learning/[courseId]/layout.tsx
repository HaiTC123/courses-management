"use client";

import { useCallback, useEffect, useState } from "react";
import { CourseSidebar } from "./_components/course-sidebar";
import toast from "react-hot-toast";
import { getCourseByIdService } from "@/services/course.service";
import { CourseNavbar } from "./_components/course-navbar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";

const CourseIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { courseId } = params;
  const authenticated = useAuthStore.getState().authenticated;
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [course, setCourse] = useState<any>({});

  const fetchCourse = useCallback(async () => {
    try {
      const response = await getCourseByIdService(Number(courseId));
      if (response.data) {
        console.log(response.data);
        setCourse(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (!authenticated) {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      {domLoaded && (
        <div className="w-full h-full">
          <div className="h-[80px] md:pl-80 fixed inset-y-0 z-50 w-full">
            <CourseNavbar course={course} />
          </div>
          <div className="fixed inset-y-0 z-50 flex-col hidden h-full md:flex w-80">
            <CourseSidebar course={course} progressCount={0} />
          </div>
          <main className="h-full md:pl-80 md:pt-[80px]">{children}</main>
        </div>
      )}
    </>
  );
};

export default CourseIdLayout;
