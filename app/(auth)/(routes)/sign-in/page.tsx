"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useAuthStore } from "@/store/use-auth-store";
import toast from "react-hot-toast";
import { UserRole } from "@/enum/user-role";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập đúng địa chỉ email",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});

const SignIn = () => {
  const router = useRouter();

  const { signIn, getCurrentUser } = useAuthStore.getState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signIn(values);
      await getCurrentUser();
      if (response) {
        toast.success("Đăng nhập thành công");
        if (response?.data?.role === UserRole.ADMIN) {
          router.push("/admin");
          return;
        }
        if (response?.data?.role === UserRole.INSTRUCTOR) {
          router.push("/instructor");
          return;
        }
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-12 w-full h-full rounded-md sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            Đăng nhập
          </h2>
        </div>
        <div className="p-6 mt-8 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Nhập email"
                        type="email"
                      />
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
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Nhập mật khẩu"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full"
              >
                Đăng nhập
              </Button>
            </form>
          </Form>
        </div>
        <div className="text-sm text-center">
          <Link
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Không có tài khoản? Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
