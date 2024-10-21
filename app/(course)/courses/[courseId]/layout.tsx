import { CourseSidebar } from "./_components/course-sidebar";

const CourseIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { courseId } = params;

  const course = {
    id: "1",
    title: "Course 1",
    imageUrl: "https://via.placeholder.com/600x400",
    price: 100,
    category: {
      id: "1",
      name: "Category 1",
    },
  };

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 flex-col hidden h-full md:flex w-80">
        <CourseSidebar course={course} progressCount={0} />
      </div>
      <main className="h-full md:pl-80">{children}</main>
    </div>
  );
};

export default CourseIdLayout;
