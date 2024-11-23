"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { updateQuestionService } from "@/services/question.service";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface QuestionDetailFormProps {
  initialData: any;
  questionId: string;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Nội dung câu hỏi là bắt buộc",
  }),
  correctAnswer: z.string().min(1, {
    message: "Đáp án đúng là bắt buộc",
  }),
});

export const QuestionDetailForm = ({
  initialData,
  questionId,
}: QuestionDetailFormProps) => {
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
      await updateQuestionService(Number(questionId), values);
      toast.success("Cập nhật câu hỏi thành công");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Cập nhật câu hỏi thất bại");
    }
  };

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <div className="p-4 mt-6 border rounded-md ">
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung câu hỏi</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Bài 1'" />
                </FormControl>
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đáp án đúng</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'A'" />
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
