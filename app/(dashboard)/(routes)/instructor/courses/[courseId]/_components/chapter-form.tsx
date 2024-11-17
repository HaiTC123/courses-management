"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  updateChapterService,
} from "@/services/course.service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChaptersList } from "./chapters-list";

interface ChapterFormProps {
  initialData: any;
  courseId: string;
  onFetchCourse: () => Promise<void>;
}

const formSchema = z.object({
  chapterTitle: z.string().min(1),
  chapterDescription: z.string().min(1),
  chapterOrder: z.number().min(1),
});

export const ChapterForm = ({
  initialData,
  courseId,
  onFetchCourse,
}: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterTitle: "",
      chapterDescription: "",
      chapterOrder: 1,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        ...values,
        courseId: Number(courseId),
        chapterOrder: initialData.chapters.length + 1,
      };
      const response = await addChapterService(body);
      if (response) {
        toast.success("Tạo chương học thành công");
        toggleCreating();
        onFetchCourse();
      }
    } catch (error) {
      toast.error("Tạo chương học thất bại");
    }
  };

  const onReorder = async (updateData: any[]) => {
    try {
      setIsUpdating(true);
      await Promise.all(
        updateData.map((chapter) => updateChapterService(chapter.id, chapter))
      );
      toast.success("Sắp xếp chương học thành công");
      onFetchCourse();
    } catch (error) {
      toast.error("Sắp xếp chương học thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/instructor/courses/${courseId}/chapters/${id}`);
    setIsCreating(false);
    setIsUpdating(false);
  };

  return (
    <div className="relative p-4 mt-6 border rounded-md   ">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md">
          <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Các chương học
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
              Tạo chương học
            </>
          )}
        </Button>
      </div>
      {/* {!isCreating && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {"No title"}
        </p>
      )} */}
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="chapterTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề chương học</FormLabel>
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
              name="chapterDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả chương học</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Tạo chương học
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
          {initialData?.chapters?.length ? (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={
                initialData?.chapters?.sort(
                  (a: any, b: any) => a.chapterOrder - b.chapterOrder
                ) || []
              }
            />
          ) : (
            <p>Không có chương học</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Sắp xếp chương học</p>
      )}
    </div>
  );
};
