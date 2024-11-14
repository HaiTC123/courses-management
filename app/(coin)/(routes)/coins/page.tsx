"use client";

import { formatPrice } from "@/lib/format";
import { getTransactionsHistoryService } from "@/services/coin.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoinsPage = () => {
  const router = useRouter();
  const { user, getCurrentUser } = useAuthStore();
  const [params, setParams] = useState({
    pageSize: 1000,
    pageNumber: 1,
    sortOrder: "createdAt desc",
    searchKey: "",
    searchFields: [],
    includeReferences: {},
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.id) {
      setParams((prevParams: any) => ({
        ...prevParams,
        conditions: [
          {
            key: "userId",
            value: user?.id,
            condition: "equal",
          },
        ],
      }));
    }
  }, [user]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    getTransactionsHistoryService(params).then((res: any) => {
      setTransactions(res.data.data ?? []);
    });
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className="mb-4 text-4xl font-bold">Trang quản lý coin</h1>
      <div className="flex items-center gap-2 mb-8 text-2xl">
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
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Trở về trang chủ
        </button>
        <button
          onClick={() => router.push("/coins/deposit")}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Nạp coin
        </button>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="mb-4 text-2xl font-semibold">Lịch sử giao dịch</h2>
        <div className="overflow-hidden bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Id
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Mô tả
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions?.map((transaction: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.description}
                  </td>
                </tr>
              ))}
              {(!transactions || transactions.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Không tìm thấy giao dịch
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoinsPage;
