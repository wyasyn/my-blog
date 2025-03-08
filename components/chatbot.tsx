"use client";
import { AnimatePresence, motion } from "motion/react";
import ChatbotButton from "./chatbot-button";
import ChatbotInterface from "./chatbot-interface";

import { useChatbot } from "@/providers/chatbot-provider";

export default function Chatbot() {
  const { open } = useChatbot();
  return (
    <section className="fixed bottom-4 lg:bottom-8 right-3 lg:right-8 z-[100] ">
      <AnimatePresence>
        {!open ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            exit={{ opacity: 0 }}
          >
            <ChatbotButton />
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ChatbotInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
