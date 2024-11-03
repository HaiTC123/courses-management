"use client";

import { Button } from "@/components/ui/button";
import { getCourseByIdService } from "@/services/course.service";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChapterDetail } from "./_components/chapter-detail";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Expand, MinusCircle, PlusCircle } from "lucide-react";

const CourseIdPage = () => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);

  const { courseId } = params;

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

  const handleRegister = () => {
    toast.success("Đăng ký học thành công");
    router.push(`/learning/${courseId}`);
  };

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
            <CollapsibleContent className="ml-10">
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
            src={course?.backgroundUrl ?? ""}
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
          {course.isFree && (
            <h3 className="p-4 text-xl font-bold text-center">Miễn phí</h3>
          )}
          <Button className="w-full mt-4" onClick={handleRegister}>
            Đăng ký học
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
