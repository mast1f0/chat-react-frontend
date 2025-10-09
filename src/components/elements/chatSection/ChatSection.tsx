import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";
import UserMessage from "../UserMessage/UserMessage";
import OtherMessage from "../OtherMessage";
import type { Message } from "../UserMessage/UserMessage";

const currentUserId = "user-123";
export const messages: Message[] = [
  {
    id: "1",
    chat_id: "chat-123",
    content: "Привет! Как дела?",
    timestamp: "2024-01-15T10:30:00.000Z",
    read: true,
    edited: false,
    edited_time: "",
    owner_id: "user-456"
  },
  {
    id: "2",
    chat_id: "chat-123",
    content: "Привет! Все отлично, спасибо! А у тебя?",
    timestamp: "2024-01-15T10:32:15.000Z",
    read: true,
    edited: false,
    edited_time: "",
    owner_id: "user-123"
  },
  {
    id: "3",
    chat_id: "chat-123",
    content: "Тоже хорошо! Смотри, что я нашел...",
    timestamp: "2024-01-15T10:33:45.000Z",
    read: true,
    edited: true,
    edited_time: "2024-01-15T10:34:00.000Z",
    owner_id: "user-456"
  }]
export default function ChatSection() {

  return (
    <div className="main-section flex flex-col h-screen">
      <div className="chat-section flex-1 overflow-y-auto">
        {messages.map((msg) =>
          msg.owner_id === currentUserId ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <OtherMessage key={msg.id} message={msg} />
          )
        )}
      </div>
      <InputMessage/>
    </div>
  );
}
