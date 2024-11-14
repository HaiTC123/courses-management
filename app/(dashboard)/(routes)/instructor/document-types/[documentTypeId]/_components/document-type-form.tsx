"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import Editor from "@/components/editor";
import Preview from "@/components/preview";
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
import { updateDocumentTypeService } from "@/services/document-type.service";
import { Combobox } from "@/components/ui/combobox";
import { CATEGORIES } from "@/constants/category-data";

interface DocumentTypeFormProps {
  initialData: {
    name: string;
    description: string;
  };
  documentTypeId: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên loại tài liệu là bắt buộc",
  }),
  description: z.string().min(1, {
    message: "Mô tả là bắt buộc",
  }),
});

export const DocumentTypeForm = ({
  initialData,
  documentTypeId,
}: DocumentTypeFormProps) => {
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
      const response = await updateDocumentTypeService(
        Number(documentTypeId),
        values
      );
      if (response) {
        toast.success("Cập nhật loại tài liệu thành công");
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast.error("Cập nhật loại tài liệu thất bại");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Thông tin của loại tài liệu
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Sửa loại tài liệu
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên loại tài liệu</FormLabel>
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
                      disabled={isSubmitting || !isEditing}
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
                  <FormLabel>Mô tả loại tài liệu</FormLabel>
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
