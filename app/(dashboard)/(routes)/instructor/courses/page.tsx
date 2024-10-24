import { redirect } from "next/navigation";
import { columns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const { userId } = { userId: "123" };

  if (!userId) {
    return redirect("/");
  }

  const courses = [
    {
      id: "1",
      title: "Course 1",
      price: 100,
      isPublished: true,
    },
    {
      id: "2",
      title: "Course 2",
      price: 200,
      isPublished: false,
    },
    {
      id: "3",
      title: "Course 3",
      price: 300,
      isPublished: true,
    },
  ];

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
