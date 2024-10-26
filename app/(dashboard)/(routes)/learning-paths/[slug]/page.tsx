"use client";

import {
  learningPathsData,
  LearningPathSlug,
} from "@/constants/learning-paths-data";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const LearningPathPage = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const learningPathData = learningPathsData.get(slug as LearningPathSlug);

  return (
    <>
      <div className="p-6">
        <div className="mb-8 mt-2">
          <h1 className="text-2xl font-bold">{learningPathData?.title}</h1>
          <p className="my-6">{learningPathData?.description}</p>
        </div>
        {learningPathData?.parts?.map((part, index) => (
          <div key={part.id} className="mt-10">
            <h2 className="text-xl font-bold">
              {index + 1}. {part.title}
            </h2>
            <p className="mt-4">{part.description}</p>
            {part.courses?.map((course) => (
              <Link href={course.courseSlug} key={course.id}>
                <div className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 my-4 cursor-pointer">
                  {course.imageUrl && (
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        width={300}
                        height={300}
                        src={course.imageUrl}
                        alt={course.title}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPathPage;
