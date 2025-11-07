"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";

interface FieldHeaderProps {
  field: string;
}

export default function FieldHeader({ field }: FieldHeaderProps) {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();
  const info = t(`image_editor_form_info.${field}`);
  const label = t(`form_editor_fields.${field}`);
  return (
    <div className="flex items-center justify-between w-full">
      <Label className="text-sm font-medium text-foreground">{label}</Label>

      {info && (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger
              asChild
              onClick={() => setOpen((prev) => !prev)} //  mobilde tıklamayla aç/kapa
            >
              <CircleAlert
                size={14}
                className="text-muted-foreground cursor-pointer hover:text-orange-500 transition-colors"
              />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs text-xs text-foreground bg-background border border-border shadow-sm p-3 rounded-md"
            >
              {info}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
