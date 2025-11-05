import { useState } from "react";
import getToken from "../scripts/GetToken";
import { API_CONFIG } from "../../services/api";

interface IsOpened {
  isOpen: boolean;
  onClose?: () => void;
  onChatCreated?: (chat: { name: string; owner_id: string }) => void;
}

interface ChatResponse {
  name: string;
  owner_id: string;
}

export default function MeetFriendMenu({
  isOpen,
  onClose,
  onChatCreated,
}: IsOpened) {
  const [chatName, setChatName] = useState("");
  const [friendId, setFriendId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = getToken();

    try {
      if (tab === 0) {
        // Создание чата
        const response = await fetch(`${API_CONFIG.baseUrl}/chats/create/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: chatName }),
        });

        if (response.ok) {
          const data: ChatResponse = await response.json();
          onChatCreated?.(data);
          setChatName("");
          onClose?.();
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } else {
        // Добавление лички
        const response = await fetch(`${API_CONFIG.baseUrl}/friends/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ friend_id: friendId }),
        });

        if (response.ok) {
          console.log("Друг добавлен");
          setFriendId("");
          onClose?.();
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [tab, setTab] = useState(0);
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-[#403752]/20 z-[60]" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[40px] max-w-[500px] w-[90%] max-h-[80vh] z-[70] p-3 sm:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setTab(0)}
              className={`px-2 sm:px-4 py-2 rounded-[40px] min-w-[60px] sm:min-w-[100px] text-xs sm:text-sm transition-colors flex-shrink-0 ${
                tab === 0
                  ? "bg-[#403752] text-white"
                  : "bg-[#f5f4f7] text-[#8C8098]"
              }`}
            >
              Чат
            </button>
            <button
              onClick={() => setTab(1)}
              className={`px-2 sm:px-4 py-2 min-w-[60px] sm:min-w-[100px] rounded-[40px] text-xs sm:text-sm transition-colors flex-shrink-0 ${
                tab === 1
                  ? "bg-[#403752] text-white"
                  : "bg-[#f5f4f7] text-[#8C8098]"
              }`}
            >
              Друг
            </button>
          </div>

          <button
            onClick={onClose}
            className="font-black text-[#8C8098] hover:text-[#403752] text-lg sm:text-xl flex-shrink-0"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 w-full">
          <input
            type="text"
            placeholder={tab === 0 ? "Название чата" : "ID друга"}
            value={tab === 0 ? chatName : friendId}
            onChange={(e) =>
              tab === 0
                ? setChatName(e.target.value)
                : setFriendId(e.target.value)
            }
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-solid border-gray-400 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#403752] text-[#403752] placeholder-[#8C8098] text-base max-w-full w-full box-border"
            style={{ fontSize: '16px' }}
            required
          />
          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#403752] text-white rounded-[40px] hover:bg-[#403752]/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? "Загрузка..." : tab === 0 ? "Создать" : "Добавить"}
          </button>
        </form>
      </div>
    </>
  );
}
