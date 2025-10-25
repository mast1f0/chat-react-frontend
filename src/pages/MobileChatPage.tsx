import ChatSection from "../components/elements/chatSection/ChatSection";
import { useState, useRef } from "react";
import BackToMainButton from "../components/buttons/BackToMainButton";
import UserPanel from "../components/elements/UserPanel/UserPanel";

interface MobileChatPageProps {
  messages?: any[];
  chatId?: string;
}

export default function MobileChatPage({ messages, chatId }: MobileChatPageProps) {
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // пока недоделаная логика отправки файла
    const file = event.target.files?.[0];
    if (file) {
      console.log("Выбран файл:", file.name);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-white border-b border-gray-200 min-h-[60px]">
        <BackToMainButton />
        <UserPanel />
        <button className="p-1 sm:p-2 flex-shrink-0">
          <img
            src="./src/assets/glass.png"
            className="h-8 w-8 sm:h-7 sm:w-7"
            alt="Search"
          />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatSection 
          messages={messages} 
          chatId={chatId}
        />
      </div>

      <div className="flex items-center px-2 sm:px-4 gap-2 sm:gap-3 py-2 sm:py-3 bg-white border-t border-gray-200 min-h-[60px] sm:min-h-[70px]">
        <button
          onClick={handleFileSelect}
          className="w-10 h-10 sm:w-12 sm:h-12 text-[#403752] text-lg sm:text-xl font-bold transition-colors flex items-center justify-center hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <img
            className="w-6 h-6 sm:w-8 sm:h-8"
            src="./src/assets/plus.svg"
            alt="Добавить файл"
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
        <input
          className="flex-1 px-3 py-2 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 text-sm sm:text-base h-10 sm:h-12 min-w-0"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Сообщение"
        />
        <button className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-[#8C8098] rounded-full flex items-center justify-center transform transition-transform duration-200 hover:scale-125">
          {msg ? (
            <img
              className="w-6 h-6"
              src="./src/assets/airplane.svg"
              alt="Send"
            />
          ) : (
            <img className="w-6 h-6" src="./src/assets/mic.svg" alt="Send" />
          )}
        </button>
      </div>
    </div>
  );
}
