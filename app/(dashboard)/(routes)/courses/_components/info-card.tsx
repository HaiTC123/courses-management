import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  variant?: "default" | "success";
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  variant = "default",
  icon: Icon,
  label,
  numberOfItems,
}) => {
  return (
    <div className="flex items-center p-3 border rounded-md gap-x-2">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        {/* <Icon className="w-4 h-4 text-primary" /> */}
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {numberOfItems} {numberOfItems === 1 ? label : label.toLowerCase()}
        </p>
      </div>
    </div>
  );
};
