"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/editor";
import Preview from "@/components/preview";

interface LessonDetailFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  lessonId: string;
  onFetchLesson: () => Promise<void>;
}

const formSchema = z.object({
  lessonTitle: z.string().min(1, {
    message: "Title is required",
  }),
  lessonDescription: z.string().min(1, {
    message: "Description is required",
  }),
});

export const LessonDetailForm = ({
  initialData,
  courseId,
  chapterId,
  lessonId,
  onFetchLesson,
}: LessonDetailFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
      onFetchLesson();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Thông tin bài học
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa thông tin bài học
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="lessonTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên bài học</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Bài 1'" />
                </FormControl>
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="lessonDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả bài học</FormLabel>
                <FormControl>
                  {isEditing ? (
                    <Editor {...field} />
                  ) : (
                    <Preview value={field.value} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Lưu
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
