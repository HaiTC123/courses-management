import { LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

const CourseIdPage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const course: any = {
    id: 1,
    title: "Course 1",
    description: "Description 1",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    categoryId: 1,
  };

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-500">
            Complete all fields {completionText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseIdPage;
