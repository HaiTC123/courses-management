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
import { uploadFileService } from "@/services/file.service";
import { addLearningPathService } from "@/services/learn-path.service";
import { useAuthStore } from "@/store/use-auth-store";
import { omit } from "lodash";
import Link from "next/link";
import toast from "react-hot-toast";

const CreateLearningPathPage = () => {
  const router = useRouter();

  const { user } = useAuthStore.getState();

  const formSchema = z.object({
    pathName: z.string().min(1, {
      message: "Path name is required",
    }),
    description: z.string().min(1, {
      message: "Description is required",
    }),
    backgroundUrl: z.string().min(1, {
      message: "Background URL is required",
    }),
    linkBackgroundUrl: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pathName: "",
      description: "",
      backgroundUrl: "",
      linkBackgroundUrl: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const body = omit(values, "linkBackgroundUrl");
      const response = await addLearningPathService(body);
      toast.success("Lộ trình học được tạo thành công");
      if (response.data) {
        router.push(`/instructor/learning-paths/${response.data}`);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const response = await uploadFileService(file);
      // console.log(response);
      if (response.data.fileUrl) {
        form.setValue("backgroundUrl", response.data.fileUrl, {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: true,
        });
        toast.success("File được tải lên thành công");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div>
        <h1 className="text-2xl">Tạo lộ trình học</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="pathName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên lộ trình học</FormLabel>
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
                name="linkBackgroundUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh nền</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        onChange={(event) => {
                          if (event.target.files?.[0]) {
                            uploadFile(event.target.files?.[0]);
                          }
                        }}
                      />
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
                Tạo lộ trình học
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateLearningPathPage;
