import ChatSection from "../components/elements/chatSection/ChatSection";
import { useState } from "react";
import BackToMainButton from "../components/buttons/BackToMainButton";
import UserPanel from "../components/elements/UserPanel/UserPanel";

export default function MobileChatPage() {
  const [msg, setMsg] = useState("");
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <BackToMainButton />
        <UserPanel />
        <button className="p-2">
          <img
            src="./src/assets/glass.png"
            className="h-6 w-6 fill-[#403752]"
            alt="Search"
          />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatSection />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-200">
        <button className="flex-shrink-0 w-10 h-10  text-[#403752] text-xl font-bold hover:bg-blue-600 transition-colors">
          +
        </button>
        <input
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 "
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Сообщение"
        />
        <button className="flex-shrink-0 w-10 h-10 bg-[#8C8098] rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center">
          <img className="w-6 h-6" src="./src/assets/airplane.svg" alt="Send" />
        </button>
      </div>
    </div>
  );
}
