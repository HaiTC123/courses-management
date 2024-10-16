import { redirect } from "next/navigation";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = { userId: "123" };

  const { courseId, chapterId } = params;

  if (!userId) {
    return redirect("/");
  }

  return <div>ChapterIdPage</div>;
};

export default ChapterIdPage;
