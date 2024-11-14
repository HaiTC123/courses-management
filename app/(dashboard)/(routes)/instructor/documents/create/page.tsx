"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Editor from "@/components/editor";
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
  addDocumentTypeService,
  getPaginatedDocumentTypesService,
} from "@/services/document-type.service";
import Link from "next/link";
import toast from "react-hot-toast";
import { FILE_TYPES } from "@/constants/file-type-data";
import { Combobox } from "@/components/ui/combobox";
import { uploadFileService } from "@/services/file.service";
import { useEffect, useState } from "react";
import { addDocumentService } from "@/services/document.service";
import { omit } from "lodash";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/constants/default-image";

const CreateDocumentPage = () => {
  const router = useRouter();

  const formSchema = z.object({
    documentName: z.string().min(1, {
      message: "Tên tài liệu là bắt buộc",
    }),
    description: z.string().min(1, {
      message: "Mô tả là bắt buộc",
    }),
    fileType: z.string(),
    categoryId: z.number(),
    accessUrl: z.string(),
    backgroundUrl: z.string(),
    backgroundUrlFile: z.string().optional(),
    accessUrlFile: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: "",
      description: "",
      fileType: "",
      categoryId: 0,
      accessUrl: "",
      backgroundUrl: "",
      backgroundUrlFile: "",
      accessUrlFile: "",
    },
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = omit(values, "backgroundUrlFile", "accessUrlFile");
      const response = await addDocumentService(body);
      toast.success("Tài liệu được tạo thành công");
      if (response.data) {
        router.push(`/instructor/documents/${response.data}`);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
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
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên loại tài liệu</FormLabel>
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
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Editor disabled={isSubmitting} {...field} />
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      <Input
                        {...field}
                        type="file"
                        accept={form.getValues("fileType")}
                        onChange={(event) => {
                          if (event.target.files?.[0]) {
                            uploadFile(event.target.files?.[0], "accessUrl");
                          }
                        }}
                        disabled={isSubmitting || !form.getValues("fileType")}
                      />
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
                  Hủy
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Tạo tài liệu
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateDocumentPage;
