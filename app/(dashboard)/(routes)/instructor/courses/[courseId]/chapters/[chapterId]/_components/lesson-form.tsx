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
  addLessonService,
  updateLessonService,
} from "@/services/course.service";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LessonsList } from "./lessons-list";

interface LessonFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  onFetchChapter: () => Promise<void>;
}

const formSchema = z.object({
  lessonTitle: z.string().min(1),
  lessonDescription: z.string().min(1),
  lessonOrder: z.number().min(1),
  durationMinutes: z.number().min(1),
});

export const LessonForm = ({
  initialData,
  courseId,
  chapterId,
  onFetchChapter,
}: LessonFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessonTitle: "",
      lessonDescription: "",
      lessonOrder: 1,
      durationMinutes: 1,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        ...values,
        chapterId: Number(chapterId),
        lessonOrder: initialData.lessons.length + 1,
      };
      await addLessonService(body);
      toast.success("Tạo bài học thành công");
      toggleCreating();
      router.refresh();
      onFetchChapter();
    } catch (error) {
      toast.error("Tạo bài học thất bại");
    }
  };

  const onReorder = async (updateData: any[]) => {
    try {
      setIsUpdating(true);
      await Promise.all(
        updateData.map((lesson) => updateLessonService(lesson.id, lesson))
      );
      toast.success("Sắp xếp bài học thành công");
      router.refresh();
      onFetchChapter();
    } catch (error) {
      toast.error("Sắp xếp bài học thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(
      `/instructor/courses/${courseId}/chapters/${chapterId}/lessons/${id}`
    );
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
        Các bài học
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
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài học
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
              name="lessonTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên bài học</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Bài 1'"
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
              name="lessonDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả bài học</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Lưu
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.lessons?.length && "text-slate-500 italic"
          )}
        >
          {initialData?.lessons?.length ? (
            <LessonsList
              onEdit={onEdit}
              onReorder={onReorder}
              items={
                initialData?.lessons?.sort(
                  (a: any, b: any) => a.lessonOrder - b.lessonOrder
                ) || []
              }
            />
          ) : (
            <p>Không có bài học</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Sắp xếp bài học</p>
      )}
    </div>
  );
};
