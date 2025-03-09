"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface ChatbotContextType {
  open: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openChatbot = () => {
    setOpen(true);
  };

  const closeChatbot = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable body scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling when chatbot is closed
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [open]);

  return (
    <ChatbotContext.Provider
      value={{
        open,
        openChatbot,
        closeChatbot,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within the ChatbotProvider");
  }
  return context;
};
