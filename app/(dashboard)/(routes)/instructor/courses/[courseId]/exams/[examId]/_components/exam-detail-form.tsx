"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Editor from "@/components/editor";
import Preview from "@/components/preview";
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
import { updateExamService } from "@/services/exam.service";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ExamDetailFormProps {
  initialData: any;
  courseId: string;
  examId: string;
  onFetchExam: () => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  passingScore: z.number().min(1, {
    message: "Điểm đạt là bắt buộc",
  }),
});

export const ExamDetailForm = ({
  initialData,
  courseId,
  examId,
  onFetchExam,
}: ExamDetailFormProps) => {
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
      await updateExamService(Number(examId), values);
      toast.success("Cập nhật thông tin bài kiểm tra thành công");
      toggleEdit();
      router.refresh();
      onFetchExam();
    } catch (error) {
      toast.error("Cập nhật thông tin bài kiểm tra thất bại");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md ">
      <div className="flex items-center justify-between font-medium">
        Thông tin bài kiểm tra
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa thông tin bài kiểm tra
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên bài kiểm tra</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Bài kiểm tra 1'" />
                </FormControl>
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả bài kiểm tra</FormLabel>
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

          <FormField
            control={form.control}
            name="passingScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Điểm đạt</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting || !isEditing}
                    placeholder="e.g. 70"
                    className="w-full mt-2"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={!isEditing}
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
