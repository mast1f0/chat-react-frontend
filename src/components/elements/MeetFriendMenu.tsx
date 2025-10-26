import { useState } from "react";

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

    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      if (tab === 0) {
        // Создание чата
        const response = await fetch(
          "http://localhost:8091/api/v1/chats/create/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: chatName }),
          }
        );

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
        const response = await fetch(
          "http://localhost:8091/api/v1/friends/add/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ friend_id: friendId }),
          }
        );

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
  //пофиксить адаптивность и баги
  return (
    <>
      <div className="fixed inset-0 bg-[#403752]/20 z-[60]" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[40px] max-w-[500px] w-[90%] max-h-[80vh] z-[70] p-6 mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setTab(0)}
              className={`px-4 py-2 rounded-[40px] min-w-[100px] text-sm transition-colors ${
                tab === 0
                  ? "bg-[#403752] text-white"
                  : "bg-[#f5f4f7] text-[#8C8098]"
              }`}
            >
              Чат
            </button>
            <button
              onClick={() => setTab(1)}
              className={`px-4 py-2 min-w-[100px] rounded-[40px] text-sm transition-colors ${
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
            className="font-black text-[#8C8098] hover:text-[#403752] text-xl"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder={tab === 0 ? "Название чата" : "ID друга"}
            value={tab === 0 ? chatName : friendId}
            onChange={(e) =>
              tab === 0
                ? setChatName(e.target.value)
                : setFriendId(e.target.value)
            }
            className="flex-1 px-4 py-3 border border-solid border-gray-400 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#403752] text-[#403752] placeholder-[#8C8098]"
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[#403752] text-white rounded-[40px] hover:bg-[#403752]/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Загрузка..." : tab === 0 ? "Создать" : "Добавить"}
          </button>
        </form>
      </div>
    </>
  );
}
