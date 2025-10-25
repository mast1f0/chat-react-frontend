import { useState, useEffect, useRef, useCallback } from "react";
import SearchInput from "./SearchInput";
import AddFriendButton from "../buttons/AddFriend";
import { useMobileMenu } from "../../contexts/MobileMenuContext";
import { useNavigate } from "react-router-dom";

export interface Chat {
  id: string;
  name: string;
  type_chat: "group" | "private";
}

interface AsideProps {
  chats?: Chat[];
  onToggleMenu: () => void;
  onMessagesLoaded?: (chatId: string, messages: any[]) => void;
}

export default function Aside({
  chats = [],
  onToggleMenu,
  onMessagesLoaded,
}: AsideProps) {
  const { isMobileMenuOpen } = useMobileMenu();
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
    navigate(`/?chat=${chatId}&&`);
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8091/api/v1/chats/messages/all/?chat_id=${chatId}&time=${Date.now()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
      if (newWidth > 180 && newWidth < 1000) setWidth(newWidth);
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

  //для адаптивности
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (chats.length === 0)
    return (
      <div className="flex flex-col h-full">
        <div
          className="hidden md:flex md:ml-auto md:items-center md:gap-1 md:mt-2 md:mb-5"
          style={{ width: width }}
        >
          <SearchInput />
          <AddFriendButton onToggleMenu={onToggleMenu} />
        </div>
        <div
          ref={sidebarRef}
          className={`bg-[#403752] h-full md:ml-auto relative transition-transform duration-300 rounded-t-[71px] md:rounded-tl-[33px] md:rounded-tr-[0px] ${
            isMobileMenuOpen
              ? "translate-y-20 md:translate-y-0"
              : "translate-y-0"
          }`}
          style={{ width: isMobile ? "100%" : width }}
        >
          <div className="flex justify-center w-full items-center h-full">
            <h1 className="text-white font-black text-5xl text-center select-none">
              ПОКА ЗДЕСЬ ПУСТО
            </h1>
          </div>
          <div
            onMouseDown={startResizing}
            className="absolute left-0 top-0 w-2 h-full cursor-ew-resize"
          />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-full md:flex-none">
      <div
        className="hidden md:flex md:ml-auto md:items-center md:gap-1 md:mt-2 md:mb-5"
        style={{ width: width }}
      >
        <SearchInput />
        <AddFriendButton onToggleMenu={onToggleMenu} />
      </div>
      <aside
        ref={sidebarRef}
        className={`bg-[#403752] flex flex-col h-full md:ml-auto overflow-y-auto gap-2.5 custom-scrollbar transition-transform duration-300 relative rounded-t-[71px] md:rounded-tl-[33px] md:rounded-tr-[0px] ${
          isResizing ? "select-none" : "select-auto"
        } ${
          isMobileMenuOpen ? "translate-y-20 md:translate-y-0" : "translate-y-0"
        }`}
        style={{ width }}
      >
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`text-white p-2.5 flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:bg-[#F5F4F7] hover:rounded-r-4xl hover:text-[#403752] ${
              selectedChat === chat.id ? "bg-white/20" : ""
            }`}
          >
            <div className="flex-1">
              <strong className="text-2xl font-light">{chat.name}</strong>
              <div className="text-sm text-gray-300 mt-1">
                {chat.type_chat === "group" ? "Группа" : "Личный чат"}
              </div>
            </div>
          </div>
        ))}
        <div
          onMouseDown={startResizing}
          className="absolute left-0 top-0 w-2 h-full cursor-ew-resize"
        />
      </aside>
    </div>
  );
}
