import "./ChatSection.style.css";
import UserMessage from "../UserMessage";
import OtherMessage from "../OtherMessage";
import InputMessage from "../InputMessage/InputMessage";
import type { Message } from "../../../services/api";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "../../../pages/SettingsPage";
import { apiService } from "../../../services/api";
import { webSocketService } from "../../../services/websocket";
import getToken from "../../scripts/GetToken";

const token = getToken();

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
  messages?: Message[];
  chatId?: string;
  onBackToChatList?: () => void;
}

export default function ChatSection({
  onSendMessage,
  messages: externalMessages,
  chatId,
  onBackToChatList,
}: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatId) {
      loadMessages(chatId);
    }
  }, [chatId]);

  // Обновляем сообщения при изменении внешних сообщений
  useEffect(() => {
    if (externalMessages) {
      setMessages(externalMessages);
    }
  }, [externalMessages]);

  useEffect(() => {
    const handleWebSocketMessage = (wsMessage: Message) => {
      // Проверяем, что сообщение для текущего чата
      if (wsMessage.ChatId === chatId) {
        const newMessage: Message = {
          Id: wsMessage.Id,
          ChatId: wsMessage.ChatId,
          Content: wsMessage.Content,
          Edited: wsMessage.Edited,
          EditedTime: wsMessage.EditedTime,
          Read: wsMessage.Read,
          SenderId: wsMessage.SenderId,
          CreatedAt: wsMessage.CreatedAt,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    webSocketService.addMessageHandler(handleWebSocketMessage);
    return () => webSocketService.removeMessageHandler(handleWebSocketMessage);
  }, [chatId]);

  const loadMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await apiService.getChatMessages(chatId);
      // Преобразуем типы сообщений для совместимости
      const convertedMessages: Message[] = response.data.map((msg) => ({
        Id: msg.Id,
        ChatId: msg.ChatId,
        Content: msg.Content,
        Edited: msg.Edited,
        EditedTime: msg.EditedTime,
        Read: msg.Read,
        SenderId: msg.SenderId,
        CreatedAt: msg.CreatedAt,
      }));
      setMessages(convertedMessages);
    } catch (error) {
      console.error("Ошибка загрузки сообщений:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!chatId) {
      console.error("Не выбран чат");
      return;
    }

    if (!content.trim()) return;

    webSocketService.sendMessage({
      chat_id: chatId,
      content: content.trim(),
    });

    if (onSendMessage) {
      onSendMessage(content);
    }
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const getCurrentUserId = (): number | null => {
    if (!decoded) return null;
    return (decoded as any).user_id || (decoded as any).sub || null;
  };

  const currentUserId = getCurrentUserId();

  return (
    <div className="main-section flex flex-col h-full">
      {onBackToChatList && (
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 min-h-[60px]">
          <button
            onClick={onBackToChatList}
            className="w-8 h-8 rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125 bg-transparent border-none cursor-pointer"
          >
            <img
              className="btn-icon"
              src="./src/assets/Back.svg"
              style={{ maxWidth: 51, maxHeight: 51 }}
            />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Чат</h2>
          <div className="w-8"></div>
        </div>
      )}
      <div className="chat-section flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-xl">Загрузка сообщений...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="items-center font-black mx-[15%] select-none">
              <p className=" text-3xl" style={{ color: "#403752" }}>
                Ой, а здесь никого нет ,
              </p>
              <p className="text-3xl" style={{ color: "#8C8098" }}>
                но собеседника всегда можно завести
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const isConsecutive = prevMessage?.SenderId === msg.SenderId;

            return msg.SenderId === currentUserId ? (
              <UserMessage
                key={msg.Id}
                message={msg}
                isConsecutive={isConsecutive}
              />
            ) : (
              <OtherMessage
                key={msg.Id}
                message={msg}
                isConsecutive={isConsecutive}
              />
            );
          })
        )}
        <div className="w-[1px] h-[1px]" ref={bottomRef} id="bottom"></div>
      </div>
      {chatId && (
        <div className="px-4 pb-4 pt-2 flex-shrink-0">
          <InputMessage onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
