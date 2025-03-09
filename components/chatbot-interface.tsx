"use client";
import { cn } from "@/lib/utils";
import { useChatbot } from "@/providers/chatbot-provider";
import { Bot, SendHorizontal, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function ChatbotInterface() {
  const [message, setMessage] = useState<string>(""); // Type for message is string
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Array of ChatMessage type
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference for the chat end div
  const [loading, setLoading] = useState(false);

  const { closeChatbot } = useChatbot();

  // Handle form submission and message sending
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { sender: "user", text: message },
    ]);

    try {
      setLoading(true);

      const res = await fetch(`/predict`, {
        body: JSON.stringify(message),
        method: "POST",
      });

      const { answer } = await res.json();

      // Add the bot's response to the chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", text: answer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="overflow-clip bg-background rounded-lg  flex flex-col relative w-[80vw] h-[70vh] md:w-[400px] md:h-[550px] shadow-sm border py-6 px-3 ">
      <div className="absolute top-0 left-0 w-full flex items-center justify-end py-2 px-3 bg-background/90 backdrop-blur-sm">
        <button type="button" className="cursor-pointer" onClick={closeChatbot}>
          <span className="sr-only">close chatbot</span>
          <X className="w-4 h-4" />
        </button>
      </div>
      {chatHistory.length === 0 ? (
        <div>start part</div>
      ) : (
        <div className="flex-grow space-y-5 p-3 overflow-y-auto ">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={` flex gap-3 ${
                chat.sender === "user"
                  ? "justify-end text-foreground"
                  : "justify-start"
              } `}
            >
              {chat.sender === "bot" && (
                <div>
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <p
                className={` px-3 py-2 rounded-lg text-sm w-max max-w-xs ${
                  chat.sender === "user" ? " bg-muted/35" : ""
                }`}
              >
                {chat.text}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      <form
        className="flex items-center bg-secondary absolute bottom-0 left-0 w-full "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={message}
          className=" bg-transparent outline-none border-none ring-none px-3 py-2 flex-1"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type inquiry here..."
          required
        />
        <button
          className={cn(
            "bg-transparent px-3 shrink-0 py-2 cursor-pointer",
            message || loading ? "text-orange-500" : "text-muted-foreground/50"
          )}
          type="submit"
          disabled={message.length === 0 || loading}
        >
          <span className="sr-only">submit message</span>
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
}
