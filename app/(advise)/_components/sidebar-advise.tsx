import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRole } from "@/enum/user-role";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth-store";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarAdvise = ({
  className,
  listAdvises,
  selectedAdvise,
  setIsLoading,
}: {
  className?: string;
  listAdvises: any[];
  selectedAdvise: any;
  setIsLoading: (value: boolean) => void;
}) => {
  const router = useRouter();
  const { role } = useAuthStore.getState();

  return (
    <>
      <Card className={cn("flex flex-col w-80 min-w-80 h-full", className)}>
        <div className="p-4 border-b">
          {role === UserRole.STUDENT && (
            <Button
              variant="outline"
              onClick={() => router.push("/advise/create")}
            >
              Tạo cuộc tư vấn
            </Button>
          )}
          {role === UserRole.INSTRUCTOR && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-8" />
            </div>
          )}
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
                    <Badge
                      variant={
                        advise.status === "Approved"
                          ? "default"
                          : advise.status === "Cancelled"
                          ? "destructive"
                          : advise.status === "Scheduled"
                          ? "secondary"
                          : advise.status === "Completed"
                          ? "completed"
                          : "outline"
                      }
                    >
                      {advise.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default SidebarAdvise;
