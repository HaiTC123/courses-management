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
import { updateChapterService } from "@/services/course.service";

interface ChapterDetailFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  onFetchChapter: () => Promise<void>;
}

const formSchema = z.object({
  chapterTitle: z.string().min(1, {
    message: "Title is required",
  }),
  chapterDescription: z.string().min(1, {
    message: "Description is required",
  }),
});

export const ChapterDetailForm = ({
  initialData,
  courseId,
  chapterId,
  onFetchChapter,
}: ChapterDetailFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    form.reset(initialData);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapterService(Number(chapterId), values);
      toast.success("Cập nhật thông tin chương học thành công");
      toggleEdit();
      router.refresh();
      onFetchChapter();
    } catch (error) {
      toast.error("Cập nhật thông tin chương học thất bại");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Thông tin chương học
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa thông tin chương học
            </>
          )}
        </Button>
      </div>
      {/* {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description || "No description"}
        </p>
      )} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="chapterTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chương học</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Chương 1'" />
                </FormControl>
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="chapterDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả chương học</FormLabel>
                <FormControl>
                  {isEditing ? (
                    <Editor {...field} />
                  ) : (
                    <Preview
                      value={
                        field.value ||
                        "<p style='font-size: 14px; font-style: italic; color: #64748b;'>Chưa có mô tả</p>"
                      }
                    />
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
