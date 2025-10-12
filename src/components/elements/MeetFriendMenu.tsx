import { useState } from "react";

interface IsOpened {
  isOpen: boolean;
  onClose?: () => void;
}

export default function MeetFriendMenu({ isOpen, onClose }: IsOpened) {
  const [chatName, setChatName] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8091/api/v1/chats/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: chatName }),
        }
      );
      const data = await response.json(); // над ответом сервера пока думаю
    } catch (error) {
      console.log(error);
    }
  };
  const [tab, setTab] = useState(0);
  if (!isOpen) return null;
  //пофиксить адаптивность и баги
  return (
    <>
      <div className="fixed inset-0 bg-[#403752]/20 z-40" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[40px] max-w-[500px] w-full h-auto z-50 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setTab(0)}
            className={`px-4 max-h-12 py-2 rounded-[40px] text-sm transition-colors ${
              tab === 0
                ? "bg-[#403752] text-white"
                : "bg-[#f5f4f7] text-[#8C8098]"
            }`}
          >
            Чат
          </button>
          <button
            onClick={() => setTab(1)}
            className={`px-4 py-2 rounded-[40px] max-h-12 text-sm transition-colors ${
              tab === 1
                ? "bg-[#403752] text-white"
                : "bg-[#f5f4f7] text-[#8C8098]"
            }`}
          >
            Друг
          </button>

          <button
            onClick={onClose}
            className="text-[#8C8098] hover:text-[#403752] self-center ml-auto"
          >
            ✕
          </button>
          <form className="flex flex-1 min-w-full gap-3 mt-2">
            <input
              type="text"
              placeholder={tab === 0 ? "Название чата" : "ID друга"}
              onChange={(e) => setChatName(e.target.value)}
              className="flex-1 px-4 py-3 border border-b-gray-200 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#403752] text-[#403752] placeholder-[#8C8098]"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#403752] text-white rounded-[40px] hover:bg-[#403752]/90 transition-colors"
            >
              {tab === 0 ? "Создать" : "Добавить"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
