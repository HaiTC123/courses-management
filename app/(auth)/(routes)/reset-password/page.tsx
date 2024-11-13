"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { toast } from "react-hot-toast";
import { resetPasswordService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  Otp: z.string().min(6, "OTP must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ResetPasswordPage() {
  // const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      Otp: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // if (!isOtpSent) {
    // TODO: Implement sending OTP to the provided email
    // console.log("Gửi OTP đến:", values.email);
    // setIsOtpSent(true);
    try {
      const response = await resetPasswordService(values);
      if (response) {
        toast.success("Đặt lại mật khẩu thành công");
        router.push("/sign-in");
      }
    } catch (error) {
      toast.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
    }
    // } else {
    //   // TODO: Implement password reset logic
    //   console.log("Resetting password with:", values);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Đặt lại mật khẩu</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Nhập email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Nhập OTP" />
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
                    <Input
                      {...field}
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {"Đặt lại mật khẩu"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
