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
import {
  getPaginatedDocumentTypesService,
  updateDocumentTypeService,
} from "@/services/document-type.service";
import { updateDocumentService } from "@/services/document.service";
import { Combobox } from "@/components/ui/combobox";
import { FILE_TYPES } from "@/constants/file-type-data";
import { uploadFileService } from "@/services/file.service";
import { cn } from "@/lib/utils";
import { DEFAULT_IMAGE } from "@/constants/default-image";
import Image from "next/image";

interface DocumentFormProps {
  initialData: {
    documentName: string;
    description: string;
    categoryId: number;
    accessUrl: string;
    fileType: string;
    backgroundUrl: string;
  };
  documentId: string;
}

const formSchema = z.object({
  documentName: z.string().min(1, {
    message: "Tên loại tài liệu là bắt buộc",
  }),
  description: z.string().min(1, {
    message: "Mô tả là bắt buộc",
  }),
  categoryId: z.number(),
  accessUrl: z.string().optional(),
  fileType: z.string(),
  backgroundUrl: z.string().optional(),
  accessUrlFile: z.string().optional(),
  backgroundUrlFile: z.string().optional(),
});

export const DocumentForm = ({
  initialData,
  documentId,
}: DocumentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const [documentTypes, setDocumentTypes] = useState<any[]>([]);

  useEffect(() => {
    getPaginatedDocumentTypesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [],
      sortOrder: "",
      searchKey: "",
      searchFields: [],
      includeReferences: [],
    }).then((response) => {
      if (response.data.data) {
        setDocumentTypes(
          response.data.data.map((item: any) => ({
            label: item.name,
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
      const response = await updateDocumentService(Number(documentId), values);
      if (response) {
        toast.success("Cập nhật tài liệu thành công");
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast.error("Cập nhật loại tài liệu thất bại");
    }
  };

  const uploadFile = async (file: File, controlName: string) => {
    try {
      const response = await uploadFileService(file);
      if (response.data.fileUrl) {
        form.setValue(controlName as any, response.data.fileUrl);
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-4 mt-6 rounded-md border">
      <div className="flex justify-between items-center font-medium">
        Thông tin chung của tài liệu
        <Button type="button" variant="ghost" size="sm" onClick={toggleEdit}>
          {isEditing ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="mr-2 w-4 h-4" />
              Sửa tài liệu
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="documentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tài liệu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || !isEditing}
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
                  <FormLabel>Mô tả tài liệu</FormLabel>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Combobox
                      options={documentTypes}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting || !isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại file</FormLabel>
                  <FormControl>
                    <Combobox
                      options={FILE_TYPES}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        form.setValue("accessUrlFile", "");
                        form.setValue("accessUrl", "");
                      }}
                      disabled={isSubmitting || !isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessUrlFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link tài liệu</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <Input
                        {...field}
                        type="file"
                        accept={form.getValues("fileType")}
                        onChange={(event) => {
                          if (event.target.files?.[0]) {
                            uploadFile(event.target.files?.[0], "accessUrl");
                          }
                        }}
                        disabled={
                          isSubmitting ||
                          !form.getValues("fileType") ||
                          !isEditing
                        }
                      />
                    ) : (
                      <p className={cn("mt-2 text-sm italic text-slate-500")}>
                        {form.getValues("accessUrl") ?? "Chưa có tài liệu"}
                      </p>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backgroundUrlFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh nền</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          if (event.target.files?.[0]) {
                            uploadFile(
                              event.target.files?.[0],
                              "backgroundUrl"
                            );
                          }
                        }}
                        disabled={isSubmitting || !isEditing}
                      />
                    ) : (
                      <p
                        className={cn(
                          "mt-2 text-sm italic truncate text-slate-500"
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
