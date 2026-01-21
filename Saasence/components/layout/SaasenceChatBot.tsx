"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Maximize2,
  Minimize2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "error";
  timestamp?: string;
}

const formatMessageText = (text: string) => {
  let formatted = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="text-white">$1</strong>',
  );
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em class="text-slate-300">$1</em>',
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
      text: "Welcome to **SaaSence.in**. I'm **Anya**, your AI Guide.\n\nHow can I help you today?",
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

    // Add User Message to UI
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

    // FIX: Format history exactly as your API expects
    const history = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Add current user message to the history sent to API
    const fullHistory = [
      ...history,
      { role: "user", parts: [{ text: trimmedInput }] },
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: fullHistory }), // Logic restored here
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
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl hover:border-purple-500/50 transition-all"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
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
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    width: "360px",
                    height: "550px",
                    right: "24px",
                    bottom: "90px",
                  }
            }
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-40 bg-slate-950 border border-slate-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-900/30">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white leading-none">
                    Anya
                  </p>
                  <span className="text-[10px] text-emerald-500 uppercase tracking-tighter">
                    AI Assistant
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1.5 text-slate-500 hover:text-white"
                >
                  {isMaximized ? (
                    <Minimize2 size={16} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-900 border border-slate-800 text-slate-200",
                      msg.sender === "error" &&
                        "border-red-500/50 bg-red-500/10 text-red-400",
                    )}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessageText(msg.text),
                      }}
                    />
                    <p className="text-[9px] opacity-40 mt-1 uppercase tracking-tighter">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-1 items-center p-2">
                  <span
                    className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-900 bg-slate-900/10"
            >
              <div className="flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 px-3">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  rows={1}
                  className="bg-transparent border-none resize-none p-0 text-sm focus-visible:ring-0 placeholder:text-slate-600 min-h-[36px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  disabled={!inputValue.trim() || isLoading}
                  type="submit"
                  className="p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 disabled:opacity-20 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-center text-[9px] text-slate-700 mt-2 uppercase font-bold tracking-widest">
                <Zap size={8} className="inline mr-1" /> SaaSence Intelligent
                Core
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
