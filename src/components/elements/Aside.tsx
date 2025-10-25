import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
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
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(
    () => Number(localStorage.getItem("asideWidth")) || 413
  );

  const navigate = useNavigate();
  const handleChatClick = async (chatId: string) => {
    setSelectedChat(chatId);
    navigate(`/?chat=${chatId}&&`);

    //запрос сообщений чата
    const token = localStorage.getItem("access_token"); // мб сделать систему передачи токенов
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
        console.log("Messages loaded for chat:", chatId, messagesData);

        onMessagesLoaded?.(chatId, messagesData);
      } else {
        console.error(response.status);
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
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const resizerStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: 8,
    height: "100%",
    cursor: "ew-resize",
  };

  if (chats.length === 0)
    return (
      <div className={`h-full flex-col flex md:flex-none`}>
        <div
          className={`md:pr-0 md:flex md:ml-auto md:items-center md:gap-[1px] md:mt-[10px] md:mb-[20px] hidden`}
          style={{ width: width }}
        >
          <SearchInput />
          <AddFriendButton onToggleMenu={onToggleMenu} />
        </div>
        <div
          ref={sidebarRef}
          className={`bg-[#403752] h-full md:ml-auto rounded-t-[50px] md:rounded-tl-[33px] md:rounded-tr-[0px] relative rounded-t-10px transition-transform duration-300 ${
            isMobileMenuOpen
              ? "md:translate-y-0 translate-y-20"
              : "translate-y-0"
          }`}
          style={{ width: screenSize.width <= 768 ? "100%" : `${width}px` }}
        >
          <div className="flex justify-center items-center h-[100%]">
            <h1 className="text-[#fff] font-black text-5xl text-center select-none">
              ПОКА ЗДЕСЬ ПУСТО
            </h1>
          </div>
          <div onMouseDown={startResizing} style={resizerStyle} />
        </div>
      </div>
    );

  return (
    <div className={`h-full flex-col flex md:flex-none`}>
      <div
        className={`md:pr-0 md:flex md:ml-auto md:items-center md:gap-[1px] md:mt-[10px] md:mb-[20px] hidden`}
        style={{ width: width }}
      >
        <SearchInput />
        <AddFriendButton onToggleMenu={onToggleMenu} />
      </div>
      <aside
        ref={sidebarRef}
        className={`bg-[#403752] h-full md:ml-auto rounded-t-[50px] md:rounded-tl-[33px] md:rounded-tr-[0px] relative rounded-t-10px flex flex-col overflow-y-auto gap-2.5 custom-scrollbar transition-transform duration-300 ${
          isResizing ? "select-none" : "select-auto"
        } ${
          isMobileMenuOpen ? "md:translate-y-0 translate-y-20" : "translate-y-0"
        }`}
        style={{
          width: screenSize.width <= 768 ? "100%" : `${width}px`,
          borderRadius: screenSize.width <= 768 ? "71px" : undefined,
        }}
      >
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`text-white p-2.5 flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:bg-[#F5F4F7] hover:rounded-r-4xl hover:text-[#403752] ${
              selectedChat === chat.id ? "bg-white/20" : ""
            }`}
          >
            <div style={{ flex: 1 }}>
              <strong className="text-[2rem] font-light">{chat.name}</strong>
              <div className="text-sm text-gray-300 mt-1">
                {chat.type_chat === "group" ? "Группа" : "Личный чат"}
              </div>
            </div>
          </div>
        ))}
        <div onMouseDown={startResizing} style={resizerStyle} />
      </aside>
    </div>
  );
}
