import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";
import UserMessage from "../UserMessage/UserMessage";
import type { Message } from "../UserMessage/UserMessage";
import OtherMessage from "../OtherMessage";

const currentUserId = "user-123";

const messages: Message[] = [
  {
    id: "msg-001",
    chat_id: "chat-123",
    content:
      "Lorem ipsum. uam veritatis quam nostrum blanditiis! Deleniti, voluptatum, tempora ab veniam mollitia...",
    timestamp: "18:42",
    read: true,
    edited: false,
    edited_time: "",
    owner_id: "user-123", // добавляем поле с id автора
  },
  {
    id: "msg-002",
    chat_id: "chat-123",
    content: "Сообщение другого пользователя",
    timestamp: "18:45",
    read: true,
    edited: false,
    edited_time: "",
    owner_id: "user-456",
  },
];

export default function ChatSection() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="main-section"
    >
      <div className="chat-section">
        {messages.map((msg) =>
          msg.owner_id === currentUserId ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <OtherMessage key={msg.id} message={msg} />
          )
        )}
      </div>
      <InputMessage />
    </div>
  );
}
