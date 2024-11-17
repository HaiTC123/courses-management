"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import {
  addPrerequisiteService,
  deletePrerequisiteService,
} from "@/services/prerequisite.service";

interface PrerequisiteFormProps {
  initialData: {
    courseId: number;
    prerequisiteCourseId: number;
  };
  prerequisiteId: string;
}

const formSchema = z.object({
  courseId: z.number(),
  prerequisiteCourseId: z.number(),
});

export const PrerequisiteForm = ({
  initialData,
  prerequisiteId,
}: PrerequisiteFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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
      includeReferences: {},
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

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response1 = await deletePrerequisiteService(Number(prerequisiteId));
      const response2 = await addPrerequisiteService(values);
      if (response1 && response2) {
        toast.success("Cập nhật điều kiện tiên quyết thành công");
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast.error("Cập nhật điều kiện tiên quyết thất bại");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md   ">
      <div className="flex items-center justify-between font-medium">
        Thông tin chung của điều kiện tiên quyết
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa điều kiện tiên quyết
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-4">
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
                      disabled={isSubmitting || !isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
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
                      disabled={isSubmitting || !isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
              disabled={isSubmitting || !isEditing}
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
