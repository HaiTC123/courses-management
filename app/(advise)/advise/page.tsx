"use client";

import { ChatContainer } from "@/components/chat-container";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Card } from "@/components/ui/card";
import { getPaginatedAdvisesService } from "@/services/advise.service";
import { useAuthStore } from "@/store/use-auth-store";
import { Ban, CheckCircle2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarAdvise from "../_components/sidebar-advise";
import { MobileSidebarAdvise } from "../_components/sidebar-advise-mobile";

const AdvisePage = () => {
  const searchParams = useSearchParams();
  const adviseId = searchParams.get("adviseId");
  const { user, role } = useAuthStore.getState();
  const [selectedAdvise, setSelectedAdvise] = useState<any>(null);
  const [listAdvises, setListAdvises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdvises = async () => {
      setIsLoading(true);
      const res = await getPaginatedAdvisesService({
        pageSize: 1000,
        pageNumber: 1,
        conditions: [
          {
            key: "studentId",
            condition: "equal",
            value: user.student.id,
          },
        ],
        sortOrder: "createdAt desc",
        searchKey: "",
        searchFields: [],
        includeReferences: {},
      });
      if (res.data.data) {
        setListAdvises(res.data.data);
      }
      setIsLoading(false);
    };
    if (user?.student?.id) {
      fetchAdvises();
    }
  }, [user]);

  useEffect(() => {
    if (listAdvises.length > 0) {
      if (adviseId) {
        setSelectedAdvise(
          listAdvises.find((advise) => advise.id === +adviseId)
        );
      } else {
        setSelectedAdvise(null);
      }
      setIsLoading(false);
    }
  }, [listAdvises, adviseId]);

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 p-4 relative">
      <MobileSidebarAdvise
        listAdvises={listAdvises}
        selectedAdvise={selectedAdvise}
        setIsLoading={setIsLoading}
      />
      <SidebarAdvise
        className="hidden overflow-auto md:block"
        listAdvises={listAdvises}
        selectedAdvise={selectedAdvise}
        setIsLoading={setIsLoading}
      />

      {selectedAdvise ? (
        (() => {
          switch (selectedAdvise.status) {
            case "Approved":
              return (
                <ChatContainer
                  advise={selectedAdvise}
                  user={user}
                  role={role}
                />
              );
            case "Cancelled":
              return (
                <div className="flex flex-col gap-4 justify-center items-center p-8 w-full rounded-lg border">
                  <XCircle className="w-16 h-16 text-red-500" />
                  <h2 className="text-2xl font-semibold text-center">
                    Tư vấn đã bị hủy
                  </h2>
                </div>
              );
            case "Scheduled":
              return (
                <div className="flex flex-col gap-4 justify-center items-center p-8 w-full rounded-lg border">
                  <h2 className="text-2xl font-semibold text-center">
                    Yêu cầu của bạn đã được gửi đi. Vui lòng chờ phê duyệt.
                  </h2>
                </div>
              );
            case "Completed":
              return (
                <div className="flex flex-col gap-4 justify-center items-center p-8 w-full rounded-lg border">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h2 className="text-2xl font-semibold text-center">
                    Tư vấn đã hoàn thành
                  </h2>
                </div>
              );
            default:
              return (
                <div className="flex flex-col gap-4 justify-center items-center p-8 w-full rounded-lg border">
                  <Ban className="w-16 h-16 text-red-500" />
                  <h2 className="text-2xl font-semibold text-center">
                    Trạng thái không hợp lệ
                  </h2>
                </div>
              );
          }
        })()
      ) : isLoading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <Card className="flex-1 p-4 mb-4">
            <div className="flex flex-col gap-4 justify-center items-center p-8 w-full h-full">
              <h2 className="text-2xl font-semibold text-center">
                Chọn tư vấn để bắt đầu chat
              </h2>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdvisePage;
