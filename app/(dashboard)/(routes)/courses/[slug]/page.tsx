"use client";

import { useParams } from "next/navigation";

const courseDetail = {
  id: "1",
  title: "JS cơ bản",
  imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
  price: 100,
  isPublished: true,
  category: { id: "1", name: "Frontend" },
};

const CourseDetailPage = () => {
  const params = useParams();

  console.log(params);

  return <div>{params.slug}</div>;
};

export default CourseDetailPage;
