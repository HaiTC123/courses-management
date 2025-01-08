"use client";

import { DEFAULT_IMAGE } from "@/constants/default-image";
import { getLearningPathByIdService } from "@/services/learn-path.service";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CourseCard } from "./_components/course-card";
import { useAuthStore } from "@/store/use-auth-store";

const LearningPathPage = () => {
  const router = useRouter();
  const params = useParams();

  const { learningPathId } = params;

  const [learningPath, setLearningPath] = useState<any>({});

  const fetchLearningPath = useCallback(async () => {
    try {
      const response = await getLearningPathByIdService(Number(learningPathId));
      if (response.data) {
        setLearningPath(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [learningPathId]);

  useEffect(() => {
    fetchLearningPath();
  }, [fetchLearningPath]);

  const { user } = useAuthStore.getState();
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);

  useEffect(() => {
    if (user.enrolledCourseIds) {
      const courseIds =
        user.enrolledCourseIds
          .split(";")
          .map((course: any) => Number(course)) ?? [];
      setEnrolledCourseIds(courseIds);
    }
  }, [user]);

  return (
    <>
      <div className="p-6">
        <div className="mt-2 mb-8">
          <h1 className="text-2xl font-bold">{learningPath?.pathName}</h1>
          <p
            className="my-6"
            dangerouslySetInnerHTML={{
              __html: learningPath?.description ?? "",
            }}
          ></p>

        </div>
        {learningPath?.backgroundUrl ? (
          <Image
            src={learningPath?.backgroundUrl ?? DEFAULT_IMAGE}
            alt="Background Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", maxWidth: "600px" }}
          />
        ) : null}
        {learningPath?.courses?.map((course: any, index: number) => (
          <div key={course.id} className="mt-10">
            <h2 className="text-xl font-bold">
              {index + 1}. {course.title}
            </h2>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: course.description ?? "" }}
            ></p>
            <CourseCard
              id={course.courseId}
              isEnrolled={enrolledCourseIds.includes(course.courseId)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPathPage;
