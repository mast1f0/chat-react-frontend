import ChatSection from "../components/elements/chatSection/ChatSection";
import { useState } from "react";
import BackToMainButton from "../components/buttons/BackToMainButton";
import UserPanel from "../components/elements/UserPanel/UserPanel";

export default function MobileChatPage() {
  const [msg, setMsg] = useState("");
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <BackToMainButton />
        <UserPanel />
        <button className="p-2">
          <img
            src="./src/assets/glass.png"
            className="fill-[#403752]"
            alt="Search"
          />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatSection />
      </div>

      <div className="flex items-center px-4 justify-items-center gap-2 py-3 bg-white border-t border-gray-200">
        <button
          style={{ paddingInline: 0 }}
          className="w-8 h-10 text-[#403752] text-xl font-boldtransition-colors"
        >
          <img
            className="shrink-0 self-center h-9 w-9"
            src="./src/assets/plus.svg"
            alt=""
          />
        </button>
        <input
          className="flex-1 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 "
          type="text"
          style={{ paddingBlock: 15 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Сообщение"
        />
        <button className="w-10 shrink-0 h-10 bg-[#8C8098] rounded-full hover:bg-blue-600 flex items-center justify-center transform transition-transform duration-200 hover:scale-125">
          <img className="w-6 h-6" src="./src/assets/airplane.svg" alt="Send" />
        </button>
      </div>
    </div>
  );
}
