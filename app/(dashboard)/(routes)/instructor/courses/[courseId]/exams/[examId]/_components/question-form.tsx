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
  addLessonService,
  updateLessonService,
} from "@/services/course.service";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { QuestionsList } from "./questions-list";
import {
  addQuestionService,
  getPaginatedQuestionsService,
  updateQuestionService,
} from "@/services/question.service";
import { Combobox } from "@/components/ui/combobox";

interface QuestionFormProps {
  initialData: any;
  courseId: string;
  examId: string;
  onFetchExam: () => Promise<void>;
}

const formSchema = z.object({
  content: z.string().min(1),
  correctAnswer: z.string().min(1),
  option1: z.string().min(1),
  option2: z.string().min(1),
  option3: z.string().min(1),
  option4: z.string().min(1),
  orderNo: z.number().min(1),
});

export const QuestionForm = ({
  initialData,
  courseId,
  examId,
  onFetchExam,
}: QuestionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      correctAnswer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      orderNo: 1,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await getPaginatedQuestionsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "examId",
            condition: "equal",
            value: Number(examId),
          },
        ],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      if (response?.data?.data) {
        setQuestions(response?.data?.data || []);
      }
    } catch (error) {
      toast.error("Lấy câu hỏi thất bại");
    }
  }, [examId]);

  useEffect(() => {
    fetchQuestions();
  }, [examId, fetchQuestions]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const listOptions = [
        values.option1,
        values.option2,
        values.option3,
        values.option4,
      ];
      const body = {
        content: values.content,
        options: listOptions,
        correctAnswer: listOptions[Number(values.correctAnswer) - 1],
        examId: Number(examId),
        orderNo: questions.length + 1,
      };
      await addQuestionService(body);
      toast.success("Tạo câu hỏi thành công");
      toggleCreating();
      router.refresh();
      // onFetchExam();
      fetchQuestions();
    } catch (error) {
      toast.error("Tạo câu hỏi thất bại");
    }
  };

  const onReorder = async (updateData: any[]) => {
    try {
      setIsUpdating(true);
      await Promise.all(
        updateData.map((question) =>
          updateQuestionService(question.id, question)
        )
      );
      toast.success("Sắp xếp câu hỏi thành công");
      router.refresh();
      onFetchExam();
    } catch (error) {
      toast.error("Sắp xếp câu hỏi thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(
      `/instructor/courses/${courseId}/exams/${examId}/questions/${id}`
    );
    fetchQuestions();
    setIsCreating(false);
    setIsUpdating(false);
  };

  return (
    <div className="relative p-4 mt-6 border rounded-md ">
      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full rounded-md">
          <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Các câu hỏi
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
              Tạo câu hỏi
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên câu hỏi</FormLabel>
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
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'A'"
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
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'A'"
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
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'A'"
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
              name="option4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án 4</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'A'"
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
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đáp án đúng</FormLabel>
                  <FormControl>
                    <Combobox
                      options={[
                        {
                          label: "Đáp án 1",
                          value: "1",
                        },
                        {
                          label: "Đáp án 2",
                          value: "2",
                        },
                        {
                          label: "Đáp án 3",
                          value: "3",
                        },
                        {
                          label: "Đáp án 4",
                          value: "4",
                        },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
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
          {questions?.length ? (
            <QuestionsList
              onEdit={onEdit}
              onReorder={onReorder}
              items={questions}
            />
          ) : (
            <p>Không có câu hỏi</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Sắp xếp câu hỏi</p>
      )}
    </div>
  );
};
