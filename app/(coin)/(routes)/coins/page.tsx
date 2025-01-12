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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/format";
import {
  depositCoinService,
  getTransactionsHistoryService,
} from "@/services/coin.service";
import { useAuthStore } from "@/store/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { DataTable } from "./_components/data-table";
import { createColumns } from "./_components/column";
import {  useSearchParams } from "next/navigation";

const depositSchema = z.object({
  numberCoin: z.string().transform((v) => Number(v) || 0),
});

const CoinsPage = () => {
  const { user, getCurrentUser } = useAuthStore.getState();
  const [transactions, setTransactions] = useState([]);
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab");
  const defaultTab = tabQuery === "2" ? "history" : "deposit";
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactionsHistoryService({
        pageSize: 1000,
        pageNumber: 1,
        sortOrder: "createdAt desc",
        searchKey: "",
        conditions: [
          {
            key: "userId",
            value: user?.id,
            condition: "equal",
          },
        ],
        searchFields: [],
        includeReferences: {},
      });
      setTransactions(response.data.data ?? []);
    };
    if (user?.id) {
      fetchTransactions();
    }
  }, [user]);

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
    try {
      const response = await depositCoinService(values);
      console.log(response);
      if (response.success) {
        const url = response.data;
        if (typeof window !== "undefined") {
          window.location.href = url;
        }
      }
    } catch (error) {
      toast.error("Yêu cầu nạp tiền thất bại");
    }
  };

  const columns = createColumns();

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-wrap items-center justify-between w-full gap-2 mb-8 text-lg md:text-2xl">
        <span className="">Số coin hiện tại:</span>
        <div className="flex items-center gap-1">
          {formatPrice(user?.coinAmount || 0)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
        </div>
      </div>

      <Tabs
        defaultValue={defaultTab}
        orientation="vertical"
        className="w-full mt-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Nạp coin</TabsTrigger>
          <TabsTrigger value="history">Lịch sử giao dịch</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Nạp coin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="numberCoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số tiền</FormLabel>
                        <FormControl>
                          <Input
                            type="string"
                            placeholder="Nhập số tiền..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground">
                          Số tiền nạp tối thiểu là 2,000 VND
                        </p>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                  <Button type="submit">Xác nhận nạp tiền</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="history">
          <DataTable columns={columns} data={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoinsPage;
