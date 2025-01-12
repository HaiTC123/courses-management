"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/use-auth-store";


const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Tên phải dài ít nhất 2 ký tự",
  }),
  email: z.string().email({
    message: "Vui lòng nhập địa chỉ email hợp lệ",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải dài ít nhất 6 ký tự",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const router = useRouter();
  const { guestSignUp, getCurrentUser } = useAuthStore.getState();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: 'onChange'
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const {confirmPassword , ...param} = values;
      const response = await guestSignUp(param); 
      if (response?.success) {
        toast.success("Đăng ký thành công");
        await getCurrentUser();
        router.push("/");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Không thể đăng ký. Vui lòng thử lại"
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-12 rounded-md sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">Tạo tài khoản</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} placeholder="Nhập họ và tên" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} type="email" placeholder="Nhập email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} type="password" placeholder="Nhập mật khẩu" />
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
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} type="password" placeholder="Xác nhận mật khẩu" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
              Tạo tài khoản
            </Button>
          </form>
        </Form>
        <div className="text-sm text-center">
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
