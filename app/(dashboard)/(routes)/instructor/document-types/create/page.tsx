"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Editor from "@/components/editor";
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
import { CATEGORIES } from "@/constants/category-data";
import { addDocumentTypeService } from "@/services/document-type.service";
import Link from "next/link";
import toast from "react-hot-toast";

const CreateDocumentTypePage = () => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Tên loại tài liệu là bắt buộc",
    }),
    description: z.string().min(1, {
      message: "Mô tả là bắt buộc",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await addDocumentTypeService(values);
      toast.success("Loại tài liệu được tạo thành công");
      if (response.data) {
        router.push(`/instructor/document-types/${response.data}`);
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
            <div className="grid grid-cols-1 gap-4 md:max-w-xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn loại tài liệu</FormLabel>
                    <FormControl>
                      {/* <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction to Computer Science'"
                        {...field}
                      /> */}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Editor disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Hủy
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Tạo
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateDocumentTypePage;
