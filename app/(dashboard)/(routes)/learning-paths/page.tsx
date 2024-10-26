import { SearchInput } from "@/components/search-input";
import { CourseList } from "@/components/course-list";
import { LearningCard } from "./_components/learning-card";
import { learningPaths } from "@/constants/learning-paths-data";

const LearningPathsPage = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Lộ trình học</h1>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {learningPaths.map((item: any) => (
            <LearningCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LearningPathsPage;
