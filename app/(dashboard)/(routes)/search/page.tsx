import { SearchInput } from "@/components/search-input";
import { Categories } from "./_components/categories";
import { CourseList } from "@/components/course-list";

const categories = [
  {
    id: "1",
    name: "Frontend",
    value: "frontend",
  },
  {
    id: "2",
    name: "Web Development",
    value: "web-development",
  },
  {
    id: "3",
    name: "Data Science",
    value: "data-science",
  },
];

const courses: any = [
  {
    id: "1",
    title: "React",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    category: {
      id: "1",
      name: "Frontend",
    },
    userId: "1",
    progress: null,
  },
];

const SearchPage = () => {
  return (
    <>
      <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
