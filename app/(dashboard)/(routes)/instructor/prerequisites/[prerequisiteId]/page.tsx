"use client";

import { LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { getPrerequisiteByIdService } from "@/services/prerequisite.service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PrerequisiteForm } from "./_components/prerequisite-form";

const PrerequisiteIdPage = ({
  params,
}: {
  params: {
    prerequisiteId: string;
  };
}) => {
  const { prerequisiteId } = params;

  const [prerequisite, setPrerequisite] = useState<any>({});

  const fetchPrerequisite = useCallback(async () => {
    try {
      const response = await getPrerequisiteByIdService(Number(prerequisiteId));
      if (response.data) {
        setPrerequisite(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [prerequisiteId]);

  useEffect(() => {
    fetchPrerequisite();
  }, [fetchPrerequisite]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Cấu hình điều kiện tiên quyết
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-4">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Tùy chỉnh điều kiện tiên quyết</h2>
          </div>
          <PrerequisiteForm
            initialData={prerequisite}
            prerequisiteId={prerequisiteId}
          />
        </div>
      </div>
    </div>
  );
};
export default PrerequisiteIdPage;
