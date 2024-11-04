"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import toast from "react-hot-toast";
import { forgotPasswordService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Here you would typically call your password reset service
      console.log("Password reset requested for:", values.email);
      const response = await forgotPasswordService(values);
      console.log(response);
      // Implement your password reset logic here
      toast.success("Gửi yêu cầu đặt lại mật khẩu thành công");
      router.push("/reset-password");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Gửi yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-12 rounded-md bg-slate-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Quên mật khẩu
          </h2>
        </div>
        <div className="p-6 mt-8 bg-white rounded-lg shadow-sm">
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
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full"
              >
                Nhận mã OTP
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
