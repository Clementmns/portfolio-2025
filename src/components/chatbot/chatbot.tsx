"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessagesList } from "./messages-list";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { RefreshCcw, XIcon } from "lucide-react";
import { IoSend } from "react-icons/io5";
import { HiStop } from "react-icons/hi";
import { useLocale, useTranslations } from "next-intl";

export default function Chatbot() {
  const locale = useLocale();
  const t = useTranslations("Chatbot");

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [outOfTokens, setOutOfTokens] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, error, regenerate, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { locale },
    }),
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = input.trim();
    if (message) {
      setInput("");
      await sendMessage({ text: message });
      if (error?.message && error.message.toLowerCase().includes("tier")) {
        setOutOfTokens(true);
      } else {
        setOutOfTokens(false);
      }
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInput("");
    await sendMessage({ text: suggestion });
  };

  const handleRegenerate = async () => {
    await regenerate();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="container mx-auto max-w-7xl px-4 py-4 flex items-start justify-end">
        <div className="pointer-events-auto">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="default">
                <HiMiniChatBubbleLeftRight />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="top"
              className="p-0 w-[calc(100vw-2rem)] max-w-xl sm:w-[500px] flex flex-col h-[70vh] max-h-[600px]"
              style={{
                zIndex: 40,
              }}
            >
              <div className="p-4 border-b font-semibold text-lg flex items-center justify-between">
                {t("title")}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 cursor-pointer p-2 sm:p-0 sm:rounded-xs"
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <MessagesList
                  messages={messages}
                  status={status}
                  onSuggestionClick={handleSuggestionClick}
                />
                <div ref={messagesEndRef} />
                {error?.message && (
                  <div className="flex flex-col justify-center mx-20">
                    {outOfTokens ? (
                      <>
                        <p className="mb-4 text-center">{t("outOfTokens")}</p>
                      </>
                    ) : (
                      <>
                        <p className="mb-4 text-center">{t("error")}</p>
                        <Button
                          variant="outline"
                          className="mb-4"
                          onClick={handleRegenerate}
                        >
                          <RefreshCcw />
                          {t("regenerate")}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.currentTarget.value)}
                  autoFocus={open}
                  className="flex-1"
                  disabled={
                    status === "submitted" ||
                    error?.message !== undefined ||
                    outOfTokens
                  }
                />
                {status === "submitted" || status === "streaming" ? (
                  <Button
                    type="button"
                    onClick={stop}
                    size={"icon"}
                    className="flex justify-center items-center"
                    variant="outline"
                  >
                    <HiStop />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size={"icon"}
                    disabled={
                      input.trim().length === 0 ||
                      error?.message !== undefined ||
                      outOfTokens
                    }
                    className="flex justify-center items-center"
                  >
                    <IoSend />
                  </Button>
                )}
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
