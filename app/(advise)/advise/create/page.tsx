"use client";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
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
import { userSendToAdvisorService } from "@/services/advise.service";
import {
  getPaginatedInstructorsService,
  IGetPaginatedUsersParams,
} from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  notes: z.string().min(1, "Notes are required"),
  advisingDate: z.date({
    required_error: "Advising date is required",
  }),
  advisorId: z.number().optional(),
});

const AdviseCreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      notes: "",
      advisingDate: new Date(),
      advisorId: undefined,
    },
  });

  const { isSubmitting } = form.formState;
  const [users, setUsers] = useState<any[]>([]);

  const [params, setParams] = useState<IGetPaginatedUsersParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [],
    sortOrder: "",
    searchKey: "",
    searchFields: [],
    includeReferences: {
      user: true,
    },
  });

  const fetchInstructors = useCallback(() => {
    getPaginatedInstructorsService(params)
      .then((response) => {
        if (response.data.data) {
          const listInstructors = response.data.data.map((instructor: any) => {
            return {
              ...instructor,
              ...omit(instructor.user, "id"),
            };
          });
          setUsers(listInstructors);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Add your API call here to submit the form
      console.log(values);
      const body = {
        ...values,
        advisorId: 1,
      };
      const response = await userSendToAdvisorService(body);
      if (response.success) {
        router.push("/advise");
        toast.success("Tạo phiên hướng dẫn thành công");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Tạo phiên hướng dẫn thất bại"
      );
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tạo phiên hướng dẫn</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="advisorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giáo viên hướng dẫn</FormLabel>
                <FormControl>
                  <Combobox
                    options={users.map((user) => ({
                      label: user.fullName,
                      value: user.id,
                    }))}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chủ đề</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ghi chú</FormLabel>
                <FormControl>
                  <Textarea disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="advisingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày hướng dẫn</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
            disabled={isSubmitting}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Tạo phiên hướng dẫn
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdviseCreatePage;
