"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  Maximize2,
  Minimize2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "error";
  timestamp?: string;
}

// Simple formatter for bold/italic text
const formatMessageText = (text: string) => {
  let formatted = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-white">$1</strong>',
  );
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em class="text-zinc-400">$1</em>',
  );
  formatted = formatted.replace(/\n/g, "<br>");
  return formatted;
};

export const SaaSenceChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! I'm **Anya**, your AI Guide.\n\nHow can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Prepare History for API
    const history = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const fullHistory = [
      ...history,
      { role: "user", parts: [{ text: trimmedInput }] },
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: fullHistory }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.details || "API Failure");

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: data.botResponse || "I couldn't process that. Try again.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { id: "err", text: `Error: ${error.message}`, sender: "error" },
      ]);
    } finally {
      setIsLoading(false);
      // Optional: Focus back on input after sending
      // inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group h-14 w-14 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={
              isMaximized
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    width: "90vw",
                    height: "85vh",
                    right: "5vw",
                    bottom: "5vh",
                    borderRadius: "1rem",
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    width: "380px",
                    height: "600px",
                    right: "24px",
                    bottom: "24px",
                    borderRadius: "1.5rem",
                  }
            }
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 flex flex-col overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/30">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">Anya</h3>
                  <p className="text-xs text-zinc-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {isMaximized ? (
                    <Minimize2 size={16} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === "user"
                      ? "ml-auto items-end"
                      : "mr-auto items-start",
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none",
                      msg.sender === "error" &&
                        "bg-red-900/30 text-red-200 border border-red-800",
                    )}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessageText(msg.text),
                      }}
                    />
                  </div>
                  {msg.timestamp && (
                    <span className="mt-1 text-[10px] text-zinc-500 px-1">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-zinc-400 text-xs ml-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900/30 border-t border-zinc-800/50">
              <form
                onSubmit={handleSendMessage}
                className="flex items-end gap-2 relative bg-zinc-800/50 border border-zinc-700/50 focus-within:border-indigo-500/50 focus-within:bg-zinc-800 rounded-xl p-1.5 transition-all"
              >
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  rows={1}
                  className="min-h-[44px] w-full resize-none border-0 bg-transparent py-2.5 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="mb-1 mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-all hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
