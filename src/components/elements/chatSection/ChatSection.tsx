import "./ChatSection.style.css";
import UserMessage from "../UserMessage";
import OtherMessage from "../OtherMessage";
import InputMessage from "../InputMessage/InputMessage";
import type { Message, InfoById } from "../../../services/api";
import { useState, useRef, useEffect } from "react";
import { apiService } from "../../../services/api";
import { webSocketService } from "../../../services/websocket";
import { useSearchParams } from "react-router-dom";
import getInfoById from "../../scripts/GetInfoById";
import getDecodedToken from "../../scripts/GetDecodedToken";
import backIcon from "../../../assets/Back.svg";

interface ChatSectionProps {
  onSendMessage?: (content: string) => void;
  messages?: Message[];
  chatId?: string;
  onBackToChatList?: () => void;
  hideInput?: boolean; // Скрыть встроенный InputMessage из за мобилы
}

export default function ChatSection({
  onSendMessage,
  messages: externalMessages,
  chatId,
  onBackToChatList,
  hideInput = false,
}: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const chatIdRef = useRef<string | undefined>(chatId);

  //из localstorage может быть не массив, так что приводим к нему (ну или стараемся)
  const getUsersFromStorage = (): InfoById[] => {
    try {
      const usersString = localStorage.getItem("users") || "[]";
      const parsed = JSON.parse(usersString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const getCurrentUserId = (): number | null => {
    const decoded = getDecodedToken();
    if (!decoded) return null;

    const userId = (decoded as any).user_id || (decoded as any).id;
    if (userId !== undefined) {
      return Number(userId);
    }

    const users = getUsersFromStorage();
    const user = users.find((u) => u.username === decoded.username);
    return user?.id || null;
  };

  const findNameById = (id: number): string => {
    const users = getUsersFromStorage();
    const user = users.find((u) => u.id === id);
    return user?.username || "";
  };

  useEffect(() => {
    chatIdRef.current = chatId;
    if (!chatId) {
      setMessages([]);
      return;
    }
    getInfoById(chatId).then(() => {
      setCurrentUserId(getCurrentUserId());
    });
    loadMessages(chatId);
  }, [chatId]);

  useEffect(() => {
    if (externalMessages !== undefined && externalMessages !== null) {
      const messagesArray = Array.isArray(externalMessages)
        ? externalMessages
        : (externalMessages as any).data || [];
      const filteredMessages = messagesArray.filter((msg: Message) =>
        msg?.content?.trim()
      );
      if (filteredMessages.length > 0 || messages.length === 0) {
        setMessages(filteredMessages);
      }
    }
  }, [externalMessages]);

  useEffect(() => {
    const handleWebSocketMessage = (wsMessage: any) => {
      if (
        String(chatIdRef.current) !== String(wsMessage.chat_id) ||
        !wsMessage.content?.trim()
      ) {
        return;
      }

      const newMessage: Message = {
        id: wsMessage.id,
        chatId: wsMessage.chat_id,
        content: wsMessage.content,
        edited: wsMessage.edited || false,
        editedTime: wsMessage.edited_time || "",
        read: wsMessage.read || false,
        senderId: Number(wsMessage.sender_id),
        timestamp: wsMessage.timestamp,
      };

      setMessages((prev) => {
        if (prev.some((msg) => msg.id === newMessage.id)) {
          return prev;
        }
        return [...prev, newMessage];
      });
    };

    webSocketService.addMessageHandler(handleWebSocketMessage);
    return () => webSocketService.removeMessageHandler(handleWebSocketMessage);
  }, []);

  const loadMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await apiService.getChatMessages(chatId);
      const convertedMessages: Message[] = response.data
        .map((msg: any) => ({
          id: msg.id || msg.Id,
          chatId: msg.chat_id || msg.ChatId,
          content: msg.content || msg.Content || "",
          edited: msg.edited ?? msg.Edited ?? false,
          editedTime: msg.edited_time || msg.EditedTime || "",
          read: msg.read ?? msg.Read ?? false,
          senderId: Number(msg.sender_id || msg.SenderId),
          timestamp: msg.timestamp || msg.created_at || msg.CreatedAt || "",
        }))
        .filter((msg: Message) => msg.content?.trim());
      setMessages(convertedMessages);
    } catch (error) {
      console.error("Ошибка загрузки сообщений:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!chatId || !content.trim()) return;

    webSocketService.sendMessage({
      chat_id: chatId,
      content: content.trim(),
    });

    onSendMessage?.(content);
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const [searchParams] = useSearchParams();
  const urlChatId = searchParams.get("chat");
  const newMessage2: Message = {
    id: String(42),
    chatId: String(7),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus alias cum facere? Nesciunt consequatur inventore porro perferendis velit eligendi mollitia illo aliquid temporibus ducimus. Omnis excepturi modi quae nihil illum?",
    edited: false,
    editedTime: "",
    read: true,
    senderId: 101,
    timestamp: "2025-11-06T18:32:00Z",
  };

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
              src={backIcon}
              style={{ maxWidth: 51, maxHeight: 51 }}
            />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Чат</h2>
          <div className="w-8"></div>
        </div>
      )}
      <div className="chat-section flex-1 h-full overflow-y-auto">
        {/* test */}

        <OtherMessage isConsecutive={false} message={newMessage2} />
        <UserMessage isConsecutive={false} message={newMessage2} />
        <UserMessage isConsecutive={false} message={newMessage2} />

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-xl">Загрузка сообщений...</div>
          </div>
        ) : messages.length === 0 && !urlChatId ? (
          <div className="flex justify-center items-center h-full">
            <div className="items-center font-black mx-[15%] select-none">
              <p className="text-3xl" style={{ color: "#403752" }}>
                Ой, а здесь никого нет ,
              </p>
              <p className="text-3xl" style={{ color: "#8C8098" }}>
                но собеседника всегда можно завести
              </p>
            </div>
          </div>
        ) : (
          messages
            .filter((msg) => msg?.content?.trim())
            .map((msg, index, filteredMessages) => {
              const isConsecutive =
                filteredMessages[index - 1]?.senderId === msg.senderId;
              const isOwnMessage = msg.senderId === currentUserId;

              return isOwnMessage ? (
                <UserMessage
                  key={msg.id}
                  message={msg}
                  isConsecutive={isConsecutive}
                  name={findNameById(msg.senderId)}
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
      {chatId && !hideInput && (
        <div className="px-4 pb-4 pt-2 flex-shrink-0">
          <InputMessage onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
