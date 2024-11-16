"use client";

import { ChatContainer } from "@/components/chat-container";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getPaginatedAdvisesService,
  instructorApproveAdviseService,
  instructorCompleteAdviseService,
  instructorRejectAdviseService,
} from "@/services/advise.service";
import { useAuthStore } from "@/store/use-auth-store";
import { Ban, CheckCircle2, Search, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SidebarAdvise from "../../_components/sidebar-advise";
import { MobileSidebarAdvise } from "../../_components/sidebar-advise-mobile";

const InstructorAdvisePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adviseId = searchParams.get("adviseId");
  const { user, role } = useAuthStore.getState();
  const [selectedAdvise, setSelectedAdvise] = useState<any>(null);

  const [listAdvises, setListAdvises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvises = useCallback(async () => {
    setIsLoading(true);
    const res = await getPaginatedAdvisesService({
      pageSize: 1000,
      pageNumber: 1,
      conditions: [
        {
          key: "advisorId",
          condition: "equal",
          value: user.instructor.id,
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
    return res;
  }, [user]);

  useEffect(() => {
    if (user?.instructor?.id) {
      fetchAdvises();
    }
  }, [fetchAdvises, user]);

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

  const handleApprove = async () => {
    try {
      const res = await instructorApproveAdviseService(selectedAdvise.id);
      console.log(res);
      if (res) {
        toast.success("Duyệt tư vấn thành công");
        fetchAdvises();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const res = await instructorRejectAdviseService(selectedAdvise.id);
      console.log(res);
      if (res) {
        toast.success("Từ chối tư vấn thành công");
        fetchAdvises();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async () => {
    try {
      const res = await instructorCompleteAdviseService(selectedAdvise.id);
      console.log(res);
      if (res) {
        toast.success("Hoàn thành tư vấn thành công");
        fetchAdvises();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 p-4 relative">
      {/* Sidebar */}
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

      {/* Chat Area */}
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
                <div className="flex flex-col items-center justify-center w-full gap-4 p-8">
                  <XCircle className="w-16 h-16 text-red-500" />
                  <h2 className="text-2xl font-semibold text-center">
                    Tư vấn đã bị hủy
                  </h2>
                </div>
              );
            case "Scheduled":
              return (
                <div className="flex flex-col w-full gap-4 p-4 border rounded-lg">
                  <h1 className="text-2xl font-bold">{selectedAdvise.topic}</h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedAdvise.notes}
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleApprove}>Duyệt</Button>
                    <Button variant="outline" onClick={handleReject}>
                      Hủy
                    </Button>
                  </div>
                </div>
              );
            case "Completed":
              return (
                <div className="flex flex-col items-center justify-center w-full gap-4 p-8 border rounded-lg">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h2 className="text-2xl font-semibold text-center">
                    Tư vấn đã hoàn thành
                  </h2>
                </div>
              );
            default:
              return (
                <div className="flex flex-col items-center justify-center w-full gap-4 p-8 border rounded-lg">
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
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8">
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

export default InstructorAdvisePage;
