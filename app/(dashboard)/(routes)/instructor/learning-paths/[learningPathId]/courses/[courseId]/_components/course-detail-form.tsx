"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

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
import {
  IGetPaginatedCoursesParams,
  getPaginatedCoursesService,
  updateMaterialService,
} from "@/services/course.service";
import { updateLearnCourseService } from "@/services/learn-path.service";
import { Combobox } from "@/components/ui/combobox";

interface CourseDetailFormProps {
  initialData: {
    title: string;
    description: string;
    courseId: string;
  };
  learningPathId: string;
  courseId: string;
  onFetchCourse: () => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  courseId: z.string(),
});

export const CourseDetailForm = ({
  initialData,
  learningPathId,
  courseId,
  onFetchCourse,
}: CourseDetailFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [params, setParams] = useState<IGetPaginatedCoursesParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchCourses = useCallback(() => {
    getPaginatedCoursesService(params)
      .then((response) => {
        if (response.data.data) {
          const listCourses = response.data.data.map((course: any) => ({
            label: course.courseName,
            value: course.id.toString(),
          }));
          setListCourses(listCourses);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateLearnCourseService(Number(courseId), values);
      toast.success("Khóa học được cập nhật");
      toggleEdit();
      router.refresh();
      onFetchCourse();
    } catch (error) {
      toast.error("Khóa học không thể cập nhật");
    }
  };

  // const uploadFile = async (file: File) => {
  //   try {
  //     const response = await uploadFileService(file);
  //     console.log(response);
  //     if (response.data.fileUrl) {
  //       console.log("response.data.fileUrl", response.data.fileUrl);
  //       form.setValue("materialURL", response.data.fileUrl, {
  //         shouldValidate: false,
  //         shouldDirty: true,
  //         shouldTouch: true,
  //       });
  //       toast.success("File được tải lên thành công");
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.message);
  //   }
  // };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Thông tin khóa học
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa thông tin khóa học
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
                <FormLabel>Tên khóa học</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Khóa học 1'" />
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
                <FormLabel>Mô tả khóa học</FormLabel>
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
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <Combobox
                  options={listCourses}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting || !isEditing}
                />
                <FormMessage />
              </FormItem>
            )}
            disabled={isSubmitting || !isEditing}
          />

          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Lưu
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
