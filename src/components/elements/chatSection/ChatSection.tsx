import "./ChatSection.style.css";
import UserMessage from "../UserMessage";
import OtherMessage from "../OtherMessage";
import type { Message } from "../UserMessage";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "../../../pages/SettingsPage";

const token =
  localStorage.getItem("access_token") ||
  sessionStorage.getItem("access_token");

let decoded: JWT | null = null;
if (token) {
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Ошибка декодирования JWT:", error);
  }
}

interface ChatSectionProps {
  onSendMessage?: (content: string) => void;
}

export default function ChatSection({ onSendMessage }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]); // крч это наверное пока временно (визуал и тест)

  const handleSendMessage = async (content: string) => {
    if (!decoded) {
      console.error("JWT токен не декодирован");
      return;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(), //из запроса
      chat_id: "chat-1", //из запроса
      content: content,
      edited: false,
      edited_time: "",
      read: false,
      sender_id: decoded.username,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    if (onSendMessage) {
      onSendMessage(content);
    }

    //отправка на сервер
    await fetch("http://localhost:8091/api/v1/messages/", {
      //ручку потом переделаю
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chat_id: "chat-1", content }),
    });
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="main-section flex flex-col h-full">
      <div className="chat-section flex-1 overflow-y-auto">
        {messages.map((msg) =>
          msg.sender_id === decoded?.username ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <OtherMessage key={msg.id} message={msg} />
          )
        )}
        <div className="w-[1px] h-[1px]" ref={bottomRef} id="bottom"></div>
      </div>
    </div>
  );
}
