"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
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
import { addCourseService } from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";
import Link from "next/link";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/constants/category-data";
import { uploadFileService } from "@/services/file.service";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/constants/default-image";
import { omit } from "lodash";

const CreatePage = () => {
  const router = useRouter();

  const { user } = useAuthStore.getState();

  const formSchema = z.object({
    courseCode: z.string().min(1, {
      message: "Course code is required",
    }),
    courseName: z.string().min(1, {
      message: "Course name is required",
    }),
    description: z.string().min(1, {
      message: "Description is required",
    }),
    // credits: z.number().min(0),
    instructorId: z.number().min(0),
    durationWeeks: z.number().min(1),
    category: z.string().min(1, {
      message: "Category is required",
    }),
    isMandatory: z.boolean(),
    price: z.number().min(0),
    isFree: z.boolean(),
    status: z.nativeEnum(CourseStatus).optional(),
    backgroundUrl: z.string().optional(),
    backgroundUrlTmp: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: uuidv4(),
      courseName: "",
      description: "",
      // credits: 0,
      instructorId: 1,
      durationWeeks: 0,
      category: "",
      isMandatory: false,
      price: 0,
      isFree: true,
      status: CourseStatus.DRAFT,
      backgroundUrl: "",
      backgroundUrlTmp: "",
    },
  });

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        ...omit(values, ["backgroundUrlTmp"]),
        instructorId: user?.instructor?.id,
      };
      const response = await addCourseService(body);
      if (response.data) {
        toast.success("Tạo khóa học thành công");
        router.push(`/instructor/courses/${response.data}`);
      }
    } catch (error) {
      toast.error("Tạo khóa học thất bại");
    }
  };

  const uploadFile = async (file: File, fieldName: string) => {
    try {
      const response = await uploadFileService(file);
      if (response.data.fileUrl) {
        form.setValue(fieldName as any, response.data.fileUrl, {
          shouldValidate: isSubmitted,
        });
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-2xl">Tạo khóa học</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-8 space-y-8"
          >
            <div className="grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
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
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
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
              />

              <FormField
                control={form.control}
                name="durationWeeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (weeks)</FormLabel>
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
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Combobox
                        options={CATEGORIES}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isMandatory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Mandatory</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-start w-full">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                          className="mr-2"
                        />
                        <div className="text-sm">
                          Khóa học bắt buộc hay không?
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting || form.getValues("isFree")}
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
                      <div className="flex items-center justify-start w-full">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) {
                              form.setValue("price", 0);
                            }
                          }}
                          disabled={isSubmitting}
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

              <FormField
                control={form.control}
                name="backgroundUrlTmp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh đại diện</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        onChange={(event) => {
                          if (event.target.files?.[0]) {
                            uploadFile(
                              event.target.files?.[0],
                              "backgroundUrl"
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("backgroundUrl") && (
                <div>
                  <Image
                    src={form.watch("backgroundUrl") ?? DEFAULT_IMAGE}
                    alt="Background"
                    width={0}
                    height={0}
                    sizes="100px"
                    style={{ width: "100px", height: "auto" }}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
