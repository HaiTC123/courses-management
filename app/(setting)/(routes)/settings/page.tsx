"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changePasswordService } from "@/services/auth.service";
import { omit } from "lodash";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import InformationForm from "./_components/information-form";
import { useAuthStore } from "@/store/use-auth-store";
import { UserRole } from "@/enum/user-role";
import InformationFormInstructor from "./_components/information-form-instructor";

const SettingsPage = () => {
  const router = useRouter();
  const { role } = useAuthStore.getState();

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
    try {
      const response = await changePasswordService(
        omit(values, ["confirmPassword"])
      );

      if (response) {
        toast.success("Đổi mật khẩu thành công");
      } else {
        toast.error("Đổi mật khẩu thất bại");
      }
    } catch (error) {
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
          {role === UserRole.STUDENT ||
            (role === UserRole.INSTRUCTOR && (
              <TabsTrigger value="information">Thông tin cá nhân</TabsTrigger>
            ))}
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
        {role === UserRole.STUDENT && (
          <TabsContent value="information">
            <InformationForm />
          </TabsContent>
        )}
        {role === UserRole.INSTRUCTOR && (
          <TabsContent value="information">
            <InformationFormInstructor />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SettingsPage;
