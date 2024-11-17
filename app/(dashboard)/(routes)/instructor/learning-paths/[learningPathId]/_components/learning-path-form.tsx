"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { updateLearningPathService } from "@/services/learn-path.service";
import { cn } from "@/lib/utils";
import { uploadFileService } from "@/services/file.service";
import Editor from "@/components/editor";
import Preview from "@/components/preview";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/constants/default-image";

interface LearningPathFormProps {
  initialData: {
    pathName: string;
    description: string;
    backgroundUrl: string;
    linkBackground: string;
  };
  learningPathId: string;
}

const formSchema = z.object({
  pathName: z.string().min(1, {
    message: "Path name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  backgroundUrl: z.string().min(1, {
    message: "Background URL is required",
  }),
  linkBackground: z.string().optional(),
});

export const LearningPathForm = ({
  initialData,
  learningPathId,
}: LearningPathFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
      const response = await updateLearningPathService(
        Number(learningPathId),
        values
      );
      if (response) {
        toast.success("Cập nhật khóa học thành công");
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast.error("Cập nhật khóa học thất bại");
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const response = await uploadFileService(file);
      // console.log(response);
      if (response.data.fileUrl) {
        console.log("response.data.fileUrl", response.data.fileUrl);
        form.setValue("backgroundUrl", response.data.fileUrl, {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: true,
        });
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md   ">
      <div className="flex items-center justify-between font-medium">
        Thông tin chung của khóa học
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa khóa học
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to Computer Science'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
            />

            <FormField
              control={form.control}
              name="description"
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

            <FormField
              control={form.control}
              name="linkBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh nền</FormLabel>
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
                      <p
                        className={cn(
                          "text-sm mt-2 text-slate-500 italic truncate"
                        )}
                      >
                        {form.getValues("backgroundUrl") ? (
                          <Image
                            src={
                              form.getValues("backgroundUrl") ?? DEFAULT_IMAGE
                            }
                            alt="Background Image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "100%",
                              height: "auto",
                              maxWidth: "600px",
                              borderRadius: "10px",
                            }}
                          />
                        ) : (
                          "Chưa có ảnh nền"
                        )}
                      </p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Lưu thay đổi
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
