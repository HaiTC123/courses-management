"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
import { uploadFileService } from "@/services/file.service";

interface MaterialDetailFormProps {
  initialData: {
    materialType: string;
    materialTitle: string;
    materialDescription: string;
    materialUrl: string;
    isRequired: boolean;
    durationMinutes: number;
  };
  courseId: string;
  chapterId: string;
  lessonId: string;
  materialId: string;
}

const formSchema = z.object({
  materialTitle: z.string().min(1, {
    message: "Title is required",
  }),
  materialDescription: z.string().min(1, {
    message: "Description is required",
  }),
  materialUrl: z.string().min(1, {
    message: "URL is required",
  }),
});

export const MaterialDetailForm = ({
  initialData,
  courseId,
  chapterId,
  lessonId,
  materialId,
}: MaterialDetailFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialTitle: initialData.materialTitle,
      materialDescription: initialData.materialDescription,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/materials/${materialId}`,
        values
      );
      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const uploadFile = async (file: File) => {
    console.log(file);
    try {
      const response = await uploadFileService(file);
      console.log(response);
      if (response.data.fileUrl) {
        form.setValue("materialUrl", response.data.fileUrl);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Thông tin tài liệu
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa thông tin tài liệu
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
            name="materialTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tài liệu</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Tài liệu 1'" />
                </FormControl>
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="materialDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả tài liệu</FormLabel>
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
            name="materialUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tài liệu</FormLabel>
                <FormControl>
                  {isEditing ? (
                    <Input
                      {...field}
                      type="file"
                      onChange={(event) => {
                        if (event.target.files?.[0]) {
                          uploadFile(event.target.files?.[0]);
                        }
                      }}
                    />
                  ) : (
                    <p className={cn("text-sm mt-2 text-slate-500 italic")}>
                      {field.value || "Chưa có tài liệu"}
                    </p>
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
