import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";
import UserMessage from "../UserMessage";
import OtherMessage from "../OtherMessage";
import type { Message } from "../UserMessage";
import { useState, useRef, useEffect } from "react";

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      chat_id: "chat-1",
      content: content,
      edited: false,
      edited_time: "",
      read: false,
      sender_id: "qwerty57",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="main-section flex flex-col h-screen">
      <div className="chat-section flex-1 overflow-y-auto">
        {messages.map((msg) =>
          msg.sender_id === "qwerty57" ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <OtherMessage key={msg.id} message={msg} />
          )
        )}
        <div className="w-[1px] h-[1px]" ref={bottomRef} id="bottom"></div>
      </div>
      <InputMessage onSendMessage={handleSendMessage} />
    </div>
  );
}
