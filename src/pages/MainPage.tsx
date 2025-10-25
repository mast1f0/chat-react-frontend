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

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleMessagesLoaded = (chatId: string, messages: any[]) => {
    setCurrentChatId(chatId);
    setCurrentMessages(messages);
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
  return (
    <MobileMenuProvider>
      <div className="flex h-full md:h-screen flex-col md:flex-row">
        <div className="flex flex-col md:flex-1">
          <Header />
          <div className="hidden md:block">
            <ChatSection
              messages={currentMessages}
              chatId={currentChatId || undefined}
            />
          </div>
        </div>
        <div className="flex-1 md:flex-none">
          <Aside
            chats={chats}
            onToggleMenu={toggleMenu}
            onMessagesLoaded={handleMessagesLoaded}
          />
        </div>
        <MeetFriendMenu
          isOpen={menuActive}
          onClose={() => setMenuActive(false)}
        />
      </div>
    </MobileMenuProvider>
  );
}
