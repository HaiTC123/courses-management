"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MaterialsList } from "./materials-list";
import {
  addMaterialService,
  updateMaterialService,
} from "@/services/course.service";

// export interface Lesson {
//   id: string;
//   title: string;
//   description: string;
//   videoUrl: string;
//   isPublished: boolean;
//   isFree: boolean;
// }

interface MaterialFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  lessonId: string;
  onFetchLesson: () => Promise<void>;
}

const formSchema = z.object({
  materialTitle: z.string().min(1),
  materialDescription: z.string().min(1),
  durationMinutes: z.number().min(1),
  isRequired: z.boolean(),
  materialURL: z.string(),
  materialType: z.string(),
});

export const MaterialForm = ({
  initialData,
  courseId,
  chapterId,
  lessonId,
  onFetchLesson,
}: MaterialFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialTitle: "",
      materialDescription: "",
      durationMinutes: 1,
      isRequired: false,
      materialURL: "",
      materialType: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        ...values,
        lessonId: Number(lessonId),
      };
      const response = await addMaterialService(body);
      toast.success("Tài liệu được tạo");
      toggleCreating();
      router.refresh();
      onFetchLesson();
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  const onReorder = async (updateData: any[]) => {
    try {
      setIsUpdating(true);
      await Promise.all(
        updateData.map((material) =>
          updateMaterialService(material.id, material)
        )
      );
      toast.success("Tài liệu được sắp xếp");
      router.refresh();
      onFetchLesson();
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(
      `/instructor/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/materials/${id}`
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
        Các tài liệu
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
              Tạo tài liệu
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
              name="materialTitle"
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
              name="materialDescription"
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
            !initialData?.materials?.length && "text-slate-500 italic"
          )}
        >
          {initialData?.materials?.length ? (
            <MaterialsList
              onEdit={onEdit}
              onReorder={onReorder}
              items={
                initialData?.materials?.sort(
                  (a: any, b: any) => a.materialOrder - b.materialOrder
                ) || []
              }
            />
          ) : (
            <p>Không có tài liệu</p>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">Sắp xếp tài liệu</p>
      )}
    </div>
  );
};
