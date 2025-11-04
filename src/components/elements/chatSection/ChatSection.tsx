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
import { useSearchParams } from "react-router-dom";

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
  const chatIdRef = useRef<string | undefined>(chatId);

  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      loadMessages(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (externalMessages) {
      const messagesArray = Array.isArray(externalMessages)
        ? externalMessages
        : (externalMessages as any)?.data || [];
      const filteredMessages = messagesArray.filter(
        (msg: Message) => msg && msg.content && msg.content.trim()
      );
      setMessages(filteredMessages);
    }
  }, [externalMessages]);

  useEffect(() => {
    const handleWebSocketMessage = (wsMessage: any) => {
      const currentChatId = chatIdRef.current;

      const messageChatId = wsMessage.chat_id;
      const messageId = wsMessage.id;
      const senderId = wsMessage.sender_id;
      const content = wsMessage.content;
      const timestamp = wsMessage.timestamp;

      const messageChatIdStr = String(messageChatId);
      const currentChatIdStr = currentChatId ? String(currentChatId) : null;

      if (currentChatIdStr && messageChatIdStr === currentChatIdStr) {
        if (!content || !content.trim()) {
          return;
        }

        const newMessage: Message = {
          id: messageId,
          chat_id: messageChatId,
          content: content,
          edited: wsMessage.edited || false,
          edited_time: wsMessage.edited_time || "",
          read: wsMessage.read || false,
          sender_id: senderId,
          timestamp: timestamp,
        };
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === messageId);
          if (exists) {
            return prev;
          }
          return [...prev, newMessage];
        });
      }
    };

    webSocketService.addMessageHandler(handleWebSocketMessage);

    return () => {
      webSocketService.removeMessageHandler(handleWebSocketMessage);
    };
  }, []);

  const loadMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await apiService.getChatMessages(chatId);
      //проблемы со snake_case и camelCase
      const convertedMessages: Message[] = response.data
        .map((msg: any) => ({
          id: msg.id || msg.Id,
          chat_id: msg.chat_id || msg.ChatId,
          content: msg.content || msg.Content || "",
          edited: msg.edited ?? msg.Edited ?? false,
          edited_time: msg.edited_time || msg.EditedTime || "",
          read: msg.read ?? msg.Read ?? false,
          sender_id: msg.sender_id || msg.SenderId,
          timestamp: msg.timestamp || msg.created_at || msg.CreatedAt || "",
        }))
        .filter((msg: Message) => msg.content && msg.content.trim());
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
  const [searchParams] = useSearchParams();
  const urlChatId = searchParams.get("chat");

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
      <div className="chat-section flex-1 h-full overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-xl">Загрузка сообщений...</div>
          </div>
        ) : messages.length === 0 && !urlChatId ? (
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
          messages
            .filter((msg) => msg && msg.content && msg.content.trim())
            .map((msg, index, filteredMessages) => {
              const prevMessage =
                index > 0 ? filteredMessages[index - 1] : null;
              const isConsecutive = prevMessage?.sender_id === msg.sender_id;

              const msgSenderId = Number(msg.sender_id);
              const currentUserIdNum = currentUserId
                ? Number(currentUserId)
                : null;

              return msgSenderId === currentUserIdNum ? (
                <UserMessage
                  key={msg.id}
                  message={msg}
                  isConsecutive={isConsecutive}
                />
              ) : (
                <OtherMessage
                  key={msg.id}
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
