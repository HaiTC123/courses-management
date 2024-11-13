"use client";

import { learningPaths } from "@/constants/learning-paths-data";
import { LearningCard } from "./_components/learning-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  getPaginatedLearningPathsService,
  IGetPaginatedLearningPathsParams,
} from "@/services/learn-path.service";
import toast from "react-hot-toast";
import { toSlug } from "@/lib/to-slug";

const InstructorLearningPathsPage = () => {
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
      <div className="flex justify-between p-6">
        <h1 className="text-2xl font-bold">Danh sách lộ trình học</h1>
        <Link href="/instructor/learning-paths/create">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Tạo lộ trình học
          </Button>
        </Link>
      </div>
      <div className="p-6 space-y-4">
        {learningPaths.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {learningPaths.map((item: any, idx: number) => (
              <LearningCard
                key={idx}
                id={item.id}
                title={item.pathName}
                description={item.description}
                imageUrl={item.backgroundUrl}
                slug={toSlug(item.pathName)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Không tìm thấy lộ trình học nào</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorLearningPathsPage;
