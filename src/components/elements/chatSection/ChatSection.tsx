import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";
import UserMessage from "../UserMessage/UserMessage";
import type { Message } from "../UserMessage/UserMessage";
import OtherMessage from "../OtherMessage";


export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]); // список всех сообщений

const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id:"100",
      chat_id: "someChat",
      content: messageText,
      timestamp: Date.now().toString(),
      read: false,
      edited: false,
      edited_time: "",
    }
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  
  return (
    <div className="main-section flex flex-col h-screen">
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
