import { useState, useEffect, useRef, useCallback } from "react";
import SearchInput from "./SearchInput";
import AddFriendButton from "../buttons/AddFriend";
import { useMobileMenu } from "../../contexts/MobileMenuContext";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../scripts/FetchWithAuth";
import MobileOptions from "../buttons/MobileOptions";
import { API_CONFIG } from "../../services/api";

export interface Chat {
  Id: string;
  Name: string;
  ChatType: string;
  OwnerId: number;
}

interface AsideProps {
  chats?: Chat[];
  onToggleMenu: () => void;
  onChatSelect?: (chatId: string) => void;
  onMessagesLoaded?: (chatId: string, messages: any[]) => void;
}

export default function Aside({
  chats = [],
  onToggleMenu,
  onMessagesLoaded,
  onChatSelect,
}: AsideProps) {
  const { isMobileMenuOpen } = useMobileMenu();
  const [query, setQuery] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(
    () => Number(localStorage.getItem("asideWidth")) || 413
  );
  const navigate = useNavigate();

  const handleChatClick = async (chatId: string) => {
    setSelectedChat(chatId);
    if (onChatSelect) {
      onChatSelect(chatId);
    }

    navigate(`/?chat=${chatId}`);
    try {
      const response = await fetchWithAuth(
        `${API_CONFIG.baseUrl}/chats/messages/all/?chat_id=${chatId}&time=${Date.now()}`
      );
      if (response.ok) {
        const messagesData = await response.json();
        onMessagesLoaded?.(chatId, messagesData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);
  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const right = sidebarRef.current.getBoundingClientRect().right;
      const newWidth = right - e.clientX;
      if (newWidth > 250 && newWidth < 800) setWidth(newWidth);
    },
    [isResizing]
  );

  useEffect(() => {
    localStorage.setItem("asideWidth", String(width));
  }, [width]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  //для адаптивности, без него надо страницу обновлять для переключения десктоп/мобила
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div
      className="flex flex-col h-full float-right"
      style={{ width: isMobile ? "100%" : width }}
    >
      <div className="flex flex-1 gap-2.5 items-center min-w-0 my-4 mx-2 md:mx-0 md:flex md:items-center md:gap-1 md:mt-2 md:mb-5">
        <SearchInput query={query} setQuery={setQuery} />
        {isMobile ? (
          <MobileOptions />
        ) : (
          <AddFriendButton onToggleMenu={onToggleMenu} />
        )}
      </div>
      <div
        ref={sidebarRef}
        className={`bg-[#403752] w-full h-full relative transition-transform duration-300 rounded-t-[71px] md:rounded-tl-[33px] md:rounded-tr-[0px] ${
          isMobileMenuOpen ? "translate-y-20 md:translate-y-0" : "translate-y-0"
        }`}
      >
        {!chats || chats.length === 0 ? (
          <div className="flex justify-center w-full items-center h-full">
            <h1 className="text-white font-black text-5xl text-center select-none">
              ПОКА ЗДЕСЬ ПУСТО
            </h1>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {chats
              .filter((chat) =>
                chat.Name.toLowerCase().includes(query.toLowerCase())
              )
              .map((chat, index) => (
                <div
                  key={chat.Id}
                  onClick={() => handleChatClick(chat.Id)}
                  className={`text-white p-2.5 flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:bg-[#F5F4F7] hover:text-[#403752] hover:rounded-r-4xl ${
                    selectedChat === chat.Id ? "bg-white/20" : ""
                  } ${index === 0 ? "mt-4" : ""}`}
                >
                  <div className="text-sm mt-1 flex-1">
                    <strong className="text-[2rem] font-light ">
                      {chat.Name}
                    </strong>
                  </div>
                </div>
              ))}
          </div>
        )}
        <div
          onMouseDown={startResizing}
          className="absolute left-0 top-0 w-2 h-full cursor-ew-resize"
        />
      </div>
    </div>
  );
}
