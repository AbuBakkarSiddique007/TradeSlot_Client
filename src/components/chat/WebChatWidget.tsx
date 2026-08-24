"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { chatService } from "@/services/chat.service";
import type { ChatMessage, WebChatOption } from "@/types";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Calendar,
  CreditCard,
  Bot,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

interface WebChatWidgetProps {
  embedded?: boolean;
}

const emptySubscribe = () => () => { };
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

let counter = 0;
function generateMessageId(prefix: string): string {
  counter += 1;
  return `${prefix}_${counter}_${Math.random().toString(36).substring(2, 7)}`;
}

function getFormattedTime(): string {
  if (typeof window === "undefined") return "Now";
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "msg_init",
  sender: "bot",
  text: "Hello! I am your TradeSlot booking assistant. What job do you need done and what is your location or postcode?",
  timestamp: "Now",
};

function getInitialMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [INITIAL_MESSAGE];
  try {
    const saved = sessionStorage.getItem("tradeslot_chat_history");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    console.log("Storage Error!!!");
  }
  return [INITIAL_MESSAGE];
}

export function WebChatWidget({ embedded = false }: WebChatWidgetProps) {
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("tradeslot_chat_history", JSON.stringify(messages));
      } catch {
        console.log("Storage Error!!!");
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleResetChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tradeslot_webchat_session_id");
      sessionStorage.removeItem("tradeslot_chat_history");
      chatService.getOrCreateSessionId();
    }
    setMessages([INITIAL_MESSAGE]);
    setInputText("");
  };

  const handleSend = async (contentToSend?: string, displayLabel?: string) => {
    const text = contentToSend ?? inputText.trim();
    if (!text || isLoading) return;

    if (!contentToSend) {
      setInputText("");
    }

    const currentTimestamp = getFormattedTime();

    const userMessage: ChatMessage = {
      id: generateMessageId("msg"),
      sender: "customer",
      text: displayLabel ? `Selected slot: ${displayLabel}` : text,
      timestamp: currentTimestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const currentSid = chatService.getOrCreateSessionId();
      const res = await chatService.sendMessage({
        senderRef: currentSid,
        content: text,
      });

      const botTimestamp = getFormattedTime();

      const botMessage: ChatMessage = {
        id: res.messageId || generateMessageId("bot"),
        sender: "bot",
        text: res.reply.text,
        options: res.reply.options,
        buttons: res.reply.buttons,
        timestamp: botTimestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error", err);
      const errorTimestamp = getFormattedTime();

      const errorMessage: ChatMessage = {
        id: generateMessageId("bot_err"),
        sender: "bot",
        text: "Sorry, I had trouble connecting to the booking engine. Please try again.",
        timestamp: errorTimestamp,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (option: WebChatOption) => {
    handleSend(option.id, option.label);
  };

  if (!isMounted) return null;

  const chatContainer = (
    <div
      className={
        embedded
          ? "flex h-[560px] w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl"
          : "fixed bottom-6 right-6 z-50 flex h-[580px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl shadow-black/80 backdrop-blur-xl"
      }
    >
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">TradeSlot Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-slate-400">Smart Buffer Dispatch</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            title="Reset conversation"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {!embedded && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "customer" ? "items-end" : "items-start"
              }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${msg.sender === "customer"
                ? "bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-amber-500/10"
                : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60"
                }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {msg.options && msg.options.length > 0 && (
                <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-700">
                  <p className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Select an available slot:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className="rounded-lg bg-slate-900 border border-amber-500/40 px-2.5 py-1 text-[11px] font-mono text-amber-300 transition hover:bg-amber-500 hover:text-slate-950 active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {msg.buttons && msg.buttons.length > 0 && (
                <div className="mt-3 space-y-2 pt-2 border-t border-slate-700">
                  {msg.buttons.map((btn) => (
                    <a
                      key={btn.id}
                      href={btn.description || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:brightness-110"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      {btn.label || "Pay & Confirm Booking"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <span className="mt-1 px-1 text-[10px] text-slate-500 font-mono">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 rounded-xl px-3 py-2 w-fit border border-slate-700/40">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
            <span className="text-[11px]">Finding available buffer slots...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-slate-800 bg-slate-950 p-3 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your job or postcode..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 transition hover:bg-amber-400 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return chatContainer;
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open trade booking chatbot"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-2xl shadow-amber-500/30 transition hover:brightness-110 active:scale-95"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Book a Trade</span>
        </button>
      )}

      {isOpen && chatContainer}
    </>
  );
}
