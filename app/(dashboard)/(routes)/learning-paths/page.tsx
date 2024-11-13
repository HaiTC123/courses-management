"use client";

import { SearchInput } from "@/components/search-input";
import { CourseList } from "@/components/course-list";
import { LearningCard } from "./_components/learning-card";
import { learningPaths } from "@/constants/learning-paths-data";
import { useCallback, useEffect, useState } from "react";
import {
  getPaginatedLearningPathsService,
  IGetPaginatedLearningPathsParams,
} from "@/services/learn-path.service";
import toast from "react-hot-toast";
import { toSlug } from "@/lib/to-slug";

const LearningPathsPage = () => {
  const [learningPaths, setLearningPaths] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedLearningPathsParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchLearningPaths = useCallback(() => {
    getPaginatedLearningPathsService(params)
      .then((response) => {
        if (response.data.data) {
          const listLearningPaths = response.data.data.map(
            (learningPath: any) => ({
              ...learningPath,
            })
          );
          setLearningPaths(listLearningPaths);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchLearningPaths();
  }, [fetchLearningPaths]);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Lộ trình học</h1>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {learningPaths.map((item: any) => (
            <LearningCard
              key={item.id}
              id={item.id}
              title={item.pathName}
              description={item.description}
              imageUrl={item.backgroundUrl}
              slug={toSlug(item.pathName)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LearningPathsPage;
