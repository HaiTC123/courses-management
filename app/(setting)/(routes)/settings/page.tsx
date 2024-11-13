"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { changePasswordService } from "@/services/auth.service";
import { omit } from "lodash";
import { toast } from "react-hot-toast";

const SettingsPage = () => {
  const router = useRouter();

  const passwordSchema = z
    .object({
      password: z.string().min(1, "Current password is required"),
      newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    // Handle password change logic here

    const response = await changePasswordService(
      omit(values, ["confirmPassword"])
    );
    // console.log(response);

    if (response) {
      toast.success("Đổi mật khẩu thành công");
    } else {
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Cài đặt</h1>

        <X className="w-8 h-8 cursor-pointer" onClick={() => router.back()} />
      </div>

      <Tabs
        defaultValue="changePassword"
        orientation="vertical"
        className="w-full mt-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="information">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="changePassword">Đổi mật khẩu</TabsTrigger>
        </TabsList>
        <TabsContent value="changePassword">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu hiện tại</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu mới</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit">Đổi mật khẩu</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="information"></TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
