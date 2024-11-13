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
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { depositCoinService } from "@/services/coin.service";

const depositSchema = z.object({
  numberCoin: z.string().transform((v) => Number(v) || 0),
});

const DepositCoinsPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      numberCoin: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof depositSchema>) => {
    if (Number.isNaN(values.numberCoin)) {
      return;
    }
    // Handle deposit logic here
    try {
      // Add your deposit service call here
      const response = await depositCoinService(values);
      console.log(response);
      if (response.success) {
        const url = response.data;
        if (typeof window !== "undefined") {
          window.location.href = url;
        }
      }
      toast.success("Yêu cầu nạp tiền thành công");
      // router.back();
    } catch (error) {
      toast.error("Yêu cầu nạp tiền thất bại");
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Nạp tiền</h1>
        <X className="w-8 h-8 cursor-pointer" onClick={() => router.back()} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin nạp tiền</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="numberCoin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số tiền nạp</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Nhập số tiền..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Số tiền nạp tối thiểu là 10,000 VND
                    </p>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/coins")}
              >
                Quay lại
              </Button>
              <Button type="submit">Xác nhận nạp tiền</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DepositCoinsPage;
