"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  addChapterService,
  getEligibleCoursesService,
  getPaginatedCoursesService,
  IGetPaginatedCoursesParams,
  updateChapterService,
} from "@/services/course.service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CoursesList } from "./courses-list";
import {
  addLearnCourseService,
  updateLearnCourseService,
} from "@/services/learn-path.service";
import { Combobox } from "@/components/ui/combobox";

interface CourseFormProps {
  initialData: any;
  learningPathId: string;
  onFetchLearningPath: () => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  sequenceOrder: z.number().min(1),
  courseId: z.number(),
});

export const CourseForm = ({
  initialData,
  learningPathId,
  onFetchLearningPath,
}: CourseFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [listCourses, setListCourses] = useState<any[]>([]);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      sequenceOrder: 1,
      courseId: 0,
    },
  });

  const [params, setParams] = useState<string>("");

  const fetchCourses = useCallback(() => {
    getEligibleCoursesService(params)
      .then((response) => {
        if (response.data) {
          const listCourses = response.data.map((course: any) => ({
            label: course.courseName,
            value: course.id,
          }));
          setListCourses(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (initialData?.courses?.length) {
      setParams(initialData.courses.map((course: any) => course.id).join(","));
    }
  }, [initialData]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const body = {
        ...values,
        courseId: Number(values.courseId),
        learningPathId: Number(learningPathId),
        sequenceOrder: initialData.courses.length + 1,
      };
      const response = await addLearnCourseService(body);
      if (response) {
        toast.success("Tạo khóa học thành công");
        toggleCreating();
        onFetchLearningPath();
      }
    } catch (error) {
      toast.error("Tạo khóa học thất bại");
    }
  };

  const onReorder = async (updateData: any[]) => {
    // try {
    //   setIsUpdating(true);
    //   await Promise.all(
    //     updateData.map((course) => updateLearnCourseService(course.id, course))
    //   );
    //   toast.success("Sắp xếp khóa học thành công");
    //   onFetchLearningPath();
    // } catch (error) {
    //   toast.error("Sắp xếp khóa học thất bại");
    // } finally {
    //   setIsUpdating(false);
    // }
  };

  const onEdit = (id: string) => {
    router.push(`/instructor/learning-paths/${learningPathId}/courses/${id}`);
    setIsCreating(false);
    setIsUpdating(false);
  };

  return (
    <div className="relative p-4 mt-6 border rounded-md bg-slate-100">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md">
          <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Các khóa học
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleCreating}
        >
          {isCreating ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Tạo khóa học
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề khóa học</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Chương 1'"
                      {...field}
                      className="w-full mt-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả khóa học</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khóa học</FormLabel>
                  <Combobox
                    options={listCourses}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting || !isCreating}
                  />
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting || !isCreating}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Tạo khóa học
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.chapters?.length && "text-slate-500 italic"
          )}
        >
          {initialData?.courses?.length ? (
            <CoursesList
              onEdit={onEdit}
              onReorder={onReorder}
              items={
                initialData?.courses?.sort(
                  (a: any, b: any) => a.sequenceOrder - b.sequenceOrder
                ) || []
              }
            />
          ) : (
            <p>Không có khóa học</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Sắp xếp khóa học</p>
      )}
    </div>
  );
};
