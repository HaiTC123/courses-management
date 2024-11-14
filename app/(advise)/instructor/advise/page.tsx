"use client";

import { ChatContainer } from "@/components/chat-container";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getPaginatedAdvisesService,
  instructorApproveAdviseService,
  instructorRejectAdviseService,
} from "@/services/advise.service";
import { useAuthStore } from "@/store/use-auth-store";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const InstructorAdvisePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adviseId = searchParams.get("adviseId");
  const { user, role } = useAuthStore();
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
    };
    if (user?.instructor?.id) {
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

  const handleApprove = async () => {
    try {
      const res = await instructorApproveAdviseService(selectedAdvise.id);
      console.log(res);
      if (res) {
        toast.success("Duyệt tư vấn thành công");
        // fetchAdvises();
        // router.refresh();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
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
        // fetchAdvises();
        router.refresh();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 p-4">
      {/* Sidebar */}
      <Card className="flex flex-col w-80">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {listAdvises.map((advise) => (
              <div
                key={advise.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent ${
                  selectedAdvise?.id === advise.id ? "bg-accent" : ""
                }`}
                onClick={() => {
                  setIsLoading(true);
                  router.push(`?adviseId=${advise.id}`);
                }}
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{advise.topic}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(advise.advisingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate text-muted-foreground">
                      {advise.notes}
                    </span>
                    <span className="flex items-center justify-center px-2 py-1 text-xs rounded-lg bg-primary text-primary-foreground">
                      {advise.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

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
              return <div>Tư vấn đã bị hủy</div>;
            case "Scheduled":
              return (
                <div className="flex flex-col gap-4">
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
            default:
              return (
                <div>
                  <p>Trạng thái không hợp lệ</p>
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
            <p>Chọn tư vấn để bắt đầu chat</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstructorAdvisePage;
