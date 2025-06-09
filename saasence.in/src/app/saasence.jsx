"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Utility function for text formatting
const formatMessageText = (text) => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>',
  );
  formatted = formatted.replace(/\n/g, "<br>");
  return formatted;
};

// Message Bubble Component
const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const isError = message.sender === "error";

  const bubbleVariants = {
    hidden: { opacity: 0, y: 15, ...(isUser ? { x: 20 } : { x: -20 }) },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      layout
      className={cn(
        "flex w-full items-start space-x-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shrink-0 mt-1">
          {isError ? "⚠️" : <Bot size={16} />}
        </div>
      )}
      <div
        className="flex flex-col"
        style={{ alignItems: isUser ? "flex-end" : "flex-start" }}
      >
        {isError ? (
          <Alert variant="destructive" className="max-w-[75%] rounded-2xl">
            <AlertDescription
              className="p-3 text-sm text-white"
              dangerouslySetInnerHTML={{
                __html: formatMessageText(message.text),
              }}
            />
          </Alert>
        ) : (
          <div
            className={cn(
              "max-w-[75%] p-3 rounded-2xl shadow-md text-sm leading-relaxed break-words",
              isUser
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-lg"
                : "bg-slate-700/80 text-slate-100 rounded-bl-lg border border-slate-600/50 backdrop-blur-sm",
            )}
            dangerouslySetInnerHTML={{
              __html: formatMessageText(message.text),
            }}
          />
        )}
        {message.timestamp && (
          <p
            className={cn(
              "text-xs mt-1.5 opacity-70",
              isUser
                ? "text-indigo-200 mr-1"
                : isError
                  ? "text-red-200 ml-1"
                  : "text-slate-400 ml-1",
            )}
          >
            {message.timestamp}
          </p>
        )}
      </div>
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shrink-0 mt-1">
          <User size={16} />
        </div>
      )}
    </motion.div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
    className="flex items-center space-x-1.5 p-3 justify-start"
  >
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shrink-0">
      <Bot size={16} />
    </div>
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

// Chatbot Component
export const SaaSenceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "initial-bot-message",
      text: "Welcome to **SaaSence.in**! 🚀\n\nI'm **Anya**, your Agentic AI Guide, always ready to help.\n\nHow can I assist you today regarding our *HR*, *Marketing*, or *Customer Service* AI solutions?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen, isMaximized]);

  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMaximized]);

  const toggleChat = () => {
    if (isOpen && isMaximized) {
      setIsMaximized(false);
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(!isOpen);
    }
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), isMaximized ? 0 : 300);
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    setTimeout(() => inputRef.current?.focus(), 350);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: trimmedInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const chatHistoryForAPI = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));
    const currentRequestHistory = [
      ...chatHistoryForAPI,
      { role: "user", parts: [{ text: trimmedInput }] },
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: currentRequestHistory }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || `API Error: ${response.statusText}`);
      }
      const botResponse = {
        id: `bot-${Date.now()}`,
        text:
          data.botResponse ||
          "I'm sorry, I couldn't process that. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorResponse = {
        id: `error-${Date.now()}`,
        text: `Oops, something went wrong! 🔧 ${error.message || "Please try again or contact support."}`,
        sender: "error",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const launcherVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.5 },
    },
  };

  const chatWindowVariants = {
    closed: { opacity: 0, y: 50, scale: 0.95 },
    openStandard: {
      opacity: 1,
      y: 0,
      scale: 1,
      width: "min(90vw, 24rem)",
      height: "min(75vh, 650px)",
      bottom: "6rem",
      right: "1.5rem",
      top: "auto",
      left: "auto",
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    openMaximized: {
      opacity: 1,
      y: 0,
      scale: 1,
      width: "min(95vw, 56rem)",
      height: "min(85vh, 48rem)",
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "-50%",
      bottom: "auto",
      right: "auto",
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        {isMaximized && isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm"
            onClick={toggleMaximize}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={launcherVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className={cn(
            "rounded-lg p-6 shadow-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
            "hover:from-indigo-500 hover:via-purple-500 hover:to-pink-400",
            "text-white border border-white/20",
            "w-10 h-10 flex items-center justify-center",
          )}
          aria-label={isOpen ? "Close Chat" : "Open Chat"}
        >
          <motion.div
            key={isOpen ? "close" : "chat"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={42} /> : <MessageSquare size={42} />}
          </motion.div>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="closed"
            animate={isMaximized ? "openMaximized" : "openStandard"}
            exit="closed"
            drag={isMaximized}
            dragConstraints={{ top: -100, left: -300, right: 300, bottom: 100 }}
            dragElastic={0.1}
            ref={chatRef}
            className={cn(
              "fixed z-40",
              isMaximized
                ? "shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                : "shadow-lg",
            )}
            aria-modal="true"
            role="dialog"
            aria-labelledby="chat-window-title"
          >
            <Card className="h-full bg-slate-900/90 backdrop-blur-xl border-slate-700/60 rounded-3xl flex flex-col overflow-hidden">
              <header className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(147, 51, 234, 0.4)",
                        "0 0 0 8px rgba(147, 51, 234, 0)",
                        "0 0 0 0 rgba(147, 51, 234, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot size={20} />
                  </motion.div>
                  <div>
                    <h2
                      id="chat-window-title"
                      className="text-lg font-semibold text-white flex items-center gap-2"
                    >
                      Anya
                      <span className="text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                        AI Guide
                      </span>
                    </h2>
                    <p className="text-xs text-emerald-400 flex items-center">
                      <motion.span
                        className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      Always ready to help!
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMaximize}
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                    aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMaximized ? (
                        <Minimize2 size={20} />
                      ) : (
                        <Maximize2 size={20} />
                      )}
                    </motion.div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                    aria-label="Close chat"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.div>
                  </Button>
                </div>
              </header>

              <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className={cn(
                  "p-4 border-t border-slate-700/50 bg-slate-800/50",
                  isMaximized && "p-5",
                )}
              >
                <div className="flex items-end space-x-3">
                  <div className="flex-grow relative">
                    <Textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask about SaaSence solutions..."
                      className={cn(
                        "bg-slate-800/60 border-slate-600/50 text-slate-100 placeholder-slate-400",
                        isMaximized ? "text-base" : "text-sm",
                        "resize-none max-h-32",
                      )}
                      rows={1}
                      disabled={isLoading}
                      aria-label="Chat message input"
                    />
                    {inputValue.trim() && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <span className="text-xs text-slate-500">↵</span>
                      </motion.div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className={cn(
                      "p-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600",
                      inputValue.trim() && !isLoading
                        ? "hover:from-indigo-500 hover:to-purple-500 shadow-md"
                        : "opacity-50 cursor-not-allowed",
                      isMaximized && "p-3.5",
                    )}
                    aria-label="Send message"
                  >
                    <motion.div
                      animate={{
                        scale:
                          inputValue.trim() && !isLoading ? [1, 1.1, 1] : 1,
                        transition: {
                          duration: 0.5,
                          repeat:
                            inputValue.trim() && !isLoading ? Infinity : 0,
                          repeatType: "reverse",
                        },
                      }}
                    >
                      {isLoading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <Send size={isMaximized ? 22 : 20} />
                      )}
                    </motion.div>
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
