import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import type { Chat } from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { MobileMenuProvider } from "../contexts/MobileMenuContext";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [menuActive, setMenuActive] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleMessagesLoaded = (chatId: string, messages: any[]) => {
    setCurrentChatId(chatId);
    setCurrentMessages(messages);
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const handleBackToChatList = () => {
    setShowChatOnMobile(false);
  };
  const isLogged = (): boolean => {
    return localStorage.getItem("access_token") !== null;
  };
  if (!isLogged()) window.location.href = "/login";

  //получаем чаты для панельки сбоку
  useEffect(() => {
    async function getChats() {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:8091/api/v1/chats/all/",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const chatsData = await response.json();
        setChats(chatsData);
        console.log("Chats loaded");
      } catch (error) {
        console.error(error);
      }
    }
    getChats();
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <MobileMenuProvider>
      <div className="flex h-full md:h-screen flex-col md:flex-row">
        <div className="flex flex-col md:flex-1">
          <Header />
          <div
            className={`${
              isMobile && showChatOnMobile ? "block" : "hidden"
            } md:block`}
          >
            <ChatSection
              messages={currentMessages}
              chatId={currentChatId || undefined}
              onBackToChatList={isMobile ? handleBackToChatList : undefined}
            />
          </div>
        </div>
        <div
          className={`${
            isMobile && showChatOnMobile ? "hidden" : "flex-1"
          } md:flex-none`}
        >
          <Aside
            chats={chats}
            onToggleMenu={toggleMenu}
            onMessagesLoaded={handleMessagesLoaded}
          />
        </div>
        <MeetFriendMenu
          isOpen={menuActive}
          onClose={() => setMenuActive(false)}
          onChatCreated={(chat) => {
            console.log("Новый чат создан:", chat); // для теста
          }}
        />
      </div>
    </MobileMenuProvider>
  );
}
