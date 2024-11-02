"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { CourseStatus } from "@/enum/course-status";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { addCourseService } from "@/services/course.service";
import { useAuthStore } from "@/store/use-auth-store";

const CreatePage = () => {
  const router = useRouter();

  const { user } = useAuthStore();

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
    credits: z.number().min(0),
    instructorId: z.number().min(0),
    durationWeeks: z.number().min(1),
    category: z.string().min(1, {
      message: "Category is required",
    }),
    isMandatory: z.boolean(),
    price: z.number().min(0),
    isFree: z.boolean(),
    status: z.nativeEnum(CourseStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: uuidv4(),
      courseName: "",
      description: "",
      credits: 0,
      instructorId: 1,
      durationWeeks: 0,
      category: "",
      isMandatory: false,
      price: 0,
      isFree: true,
      status: CourseStatus.DRAFT,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = {
        ...values,
        instructorId: user?.instructorId,
      };
      const response = await addCourseService(body);
      toast.success("Course created successfully");
      if (response.data) {
        router.push(`/instructor/courses/${response.data}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div>
        <h1 className="text-2xl">Tạo khóa học</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
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
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Computer Science'"
                        {...field}
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
                name="isFree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Free Course</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-start w-full">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Combobox
                      options={[
                        { value: CourseStatus.DRAFT, label: "Draft" },
                        {
                          value: CourseStatus.PENDING_APPROVAL,
                          label: "Pending Approval",
                        },
                        { value: CourseStatus.APPROVED, label: "Approved" },
                        { value: CourseStatus.REJECTED, label: "Rejected" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
                disabled
              />
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
