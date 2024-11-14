"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { getPaginatedCoursesService } from "@/services/course.service";
import { addPrerequisiteService } from "@/services/prerequisite.service";
import { omit } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreatePrerequisitePage = () => {
  const router = useRouter();

  const formSchema = z.object({
    courseId: z.number().min(1, {
      message: "Khóa học là bắt buộc",
    }),
    prerequisiteCourseId: z.number().min(1, {
      message: "Điều kiện tiên quyết là bắt buộc",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: 0,
      prerequisiteCourseId: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getPaginatedCoursesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [],
      sortOrder: "",
      searchKey: "",
      searchFields: [],
      includeReferences: [],
    }).then((response) => {
      if (response.data.data) {
        setCourses(
          response.data.data.map((item: any) => ({
            label: item.courseName,
            value: item.id,
          }))
        );
      }
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = omit(values, "");
      const response = await addPrerequisiteService(body);
      toast.success("Điều kiện tiên quyết được tạo thành công");
      if (response.data) {
        router.push(`/prerequisites/${response.data}`);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div>
        <h1 className="text-2xl">Tạo loại tài liệu</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khóa học</FormLabel>
                  <FormControl>
                    <Combobox
                      options={courses}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prerequisiteCourseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điều kiện tiên quyết</FormLabel>
                  <FormControl>
                    <Combobox
                      options={courses}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Hủy
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Tạo điều kiện tiên quyết
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePrerequisitePage;
