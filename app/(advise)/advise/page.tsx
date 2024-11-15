"use client";

import { ChatContainer } from "@/components/chat-container";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPaginatedAdvisesService } from "@/services/advise.service";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdvisePage = () => {
  const router = useRouter();
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
    <div className="h-[calc(100vh-80px)] flex gap-4 p-4">
      {/* Sidebar */}
      <Card className="flex flex-col w-80">
        <div className="p-4 border-b">
          <Button
            variant="outline"
            onClick={() => router.push("/advise/create")}
          >
            Tạo cuộc tư vấn
          </Button>
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
                <>
                  <h1>
                    Yêu cầu của bạn đã được gửi đi. Vui lòng chờ phê duyệt.
                  </h1>
                </>
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

export default AdvisePage;
