"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Back"
            onClick={() => router.back()}
          >
            <Undo2 size={16} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Back</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
