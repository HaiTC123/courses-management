"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
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
import { CourseStatus } from "@/enum/course-status";
import { updateCourseService } from "@/services/course.service";
import { uploadFileService } from "@/services/file.service";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/constants/default-image";
import { CATEGORIES } from "@/constants/category-data";

interface CourseFormProps {
  initialData: {
    courseName: string;
    description: string;
    category: string;
    isMandatory: boolean;
    price: number;
    isFree: boolean;
    status: CourseStatus;
    backgroundUrl: string;
    linkBackgroundUrl: string;
    // score: number;
  };
  courseId: string;
}

const formSchema = z.object({
  courseName: z.string().min(1, {
    message: "Tên khóa học là bắt buộc",
  }),
  description: z.string().min(1, {
    message: "Mô tả là bắt buộc",
  }),
  category: z.string().min(1, {
    message: "Danh mục là bắt buộc",
  }),
  isMandatory: z.boolean().optional(),
  price: z.number().min(0, {
    message: "Giá tối thiểu là 0",
  }),
  isFree: z.boolean(),
  status: z.nativeEnum(CourseStatus),
  backgroundUrl: z.string().optional(),
  linkBackgroundUrl: z.string().optional(),
  // score: z.number().min(0).max(100),
});

export const CourseForm = ({ initialData, courseId }: CourseFormProps) => {
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
      const response = await updateCourseService(Number(courseId), values);
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
      if (response.data.fileUrl) {
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
    <div className="p-4 mt-6 rounded-md border">
      <div className="flex justify-between items-center font-medium">
        Thông tin chung của khóa học
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="mr-2 w-4 h-4" />
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
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khóa học</FormLabel>
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Describe your course"
                      rows={1}
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
              name="linkBackgroundUrl"
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
                    ) : form.getValues("backgroundUrl") ? (
                      <Image
                        src={form.getValues("backgroundUrl") ?? DEFAULT_IMAGE}
                        alt="Background Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      <p
                        className={cn(
                          "mt-2 text-sm italic truncate text-slate-500"
                        )}
                      >
                        {"Chưa có ảnh nền"}
                      </p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
            /> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Combobox
                      options={CATEGORIES}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting || !isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
            />

            {/* <FormField
              control={form.control}
              name="isMandatory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Bắt buộc</FormLabel>
                  <FormControl>
                    <div className="flex justify-start items-center w-full">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting || !isEditing}
                        className="mr-2"
                      />
                      <div className="text-sm">
                        Khóa học bắt buộc hay không?
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
            /> */}

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={
                        isSubmitting || !isEditing || form.getValues("isFree")
                      }
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-start items-center w-full">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("price", 0);
                          }
                        }}
                        disabled={isSubmitting || !isEditing}
                        className="mr-2"
                      />
                      <div className="text-sm">
                        Khóa học miễn phí hay không?
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {isEditing && (
            <div className="flex gap-x-2 items-center">
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
