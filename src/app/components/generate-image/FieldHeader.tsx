"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";
import { CategoryFieldInfoMap } from "@/lib/types/form";

interface FieldHeaderProps {
  field: string;
  label: string;
}

export default function FieldHeader({ field, label }: FieldHeaderProps) {
  const info = CategoryFieldInfoMap[field];
  const [open, setOpen] = useState(false);

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
