"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import { useChatbot } from "@/providers/chatbot-provider";

export default function ChatbotButton() {
  const { openChatbot } = useChatbot();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Let's Chat"
            onClick={openChatbot}
          >
            <Bot size={16} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Let&apos;s Chat
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
