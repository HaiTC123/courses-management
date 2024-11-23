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
  addExamService,
  getPaginatedExamsService,
  publishExamService,
  updateExamService,
} from "@/services/exam.service";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ExamsList } from "./exams-list";

interface ExamFormProps {
  initialData: any;
  courseId: string;
  onFetchCourse: () => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coefficient: z.number().min(1),
  maxAttempts: z.number().optional().nullable(),
  passingScore: z.number().min(0).max(100),
  endTime: z.date().optional(),
});

export const ExamForm = ({
  initialData,
  courseId,
  onFetchCourse,
}: ExamFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [exams, setExams] = useState<any[]>([]);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const endTime = new Date();
  endTime.setFullYear(endTime.getFullYear() + 1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      coefficient: 1,
      maxAttempts: null,
      passingScore: 0,
      endTime: endTime,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const fetchExam = useCallback(async () => {
    try {
      const response = await getPaginatedExamsService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "courseId",
            condition: "equal",
            value: Number(courseId),
          },
        ],
        sortOrder: "",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      if (response?.data?.data) {
        setExams(response?.data?.data || []);
      }
    } catch (error) {
      toast.error("Lấy bài kiểm tra thất bại");
    }
  }, [courseId]);

  useEffect(() => {
    fetchExam();
  }, [courseId, fetchExam]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const body = {
        ...values,
        courseId: Number(courseId),
      };
      const response = await addExamService(body);
      const response2 = await publishExamService(response.data);
      if (response && response2) {
        toast.success("Tạo bài kiểm tra thành công");
        toggleCreating();
        onFetchCourse();
        fetchExam();
      }
    } catch (error) {
      toast.error("Tạo bài kiểm tra thất bại");
    }
  };

  const onReorder = async (updateData: any[]) => {
    // try {
    //   setIsUpdating(true);
    //   await Promise.all(
    //     updateData.map((exam) => updateExamService(exam.id, exam))
    //   );
    //   toast.success("Sắp xếp bài kiểm tra thành công");
    //   onFetchCourse();
    // } catch (error) {
    //   toast.error("Sắp xếp bài kiểm tra thất bại");
    // } finally {
    //   setIsUpdating(false);
    // }
  };

  const onEdit = (id: string) => {
    router.push(`/instructor/courses/${courseId}/exams/${id}`);
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
        Các bài kiểm tra
        {exams?.length === 0 && (
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
                Tạo bài kiểm tra
              </>
            )}
          </Button>
        )}
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
                  <FormLabel>Tiêu đề bài kiểm tra</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Bài kiểm tra 1'"
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
                  <FormLabel>Mô tả bài kiểm tra</FormLabel>
                  <FormControl>
                    <Editor {...field} />
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
                      disabled={isSubmitting}
                      placeholder="e.g. 70"
                      className="w-full mt-2"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Tạo bài kiểm tra
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
          {exams?.length ? (
            <ExamsList onEdit={onEdit} onReorder={onReorder} items={exams} />
          ) : (
            <p>Không có bài kiểm tra</p>
          )}
        </div>
      )}
      {/* {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Sắp xếp bài kiểm tra
        </p>
      )} */}
    </div>
  );
};
