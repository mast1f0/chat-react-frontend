import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import type { Chat } from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { MobileMenuProvider } from "../contexts/MobileMenuContext";
import { useEffect, useState } from "react";
import { apiService } from "../services/api";
import { webSocketService } from "../services/websocket";
import isLogged from "../components/scripts/IsLogged";
import fetchWithAuth from "../components/scripts/FetchWithAuth";

export default function MainPage() {
  const [menuActive, setMenuActive] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [selectedChatId, setSeletedChatId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isLogged) {
      window.location.href = "/login";
      return;
    }

    const loadChats = async () => {
      try {
        const chatsData = await apiService.getAllChats();
        setChats(chatsData);
      } catch (error) {
        console.log(error);
      }
    };
    // потом добавить console.log
    loadChats();

    webSocketService.connect();

    const handleConnectionChange = (connected: boolean) => {
      setWsConnected(connected);
    };

    webSocketService.addConnectionHandler(handleConnectionChange);

    return () => {
      webSocketService.removeConnectionHandler(handleConnectionChange);
      webSocketService.disconnect();
    };
  }, []);

  const handleChatSelect = (chatID: string) => {
    setSeletedChatId(chatID);
  };
  //получаем чаты для панельки сбоку
  useEffect(() => {
    async function getChats() {
      try {
        const response = await fetchWithAuth(
          "http://localhost:8091/api/v1/chats/all/"
        );
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
          <Header wsConnected={wsConnected} />
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
            onChatSelect={handleChatSelect}
            onToggleMenu={toggleMenu}
            onMessagesLoaded={handleMessagesLoaded}
          />
        </div>
        <MeetFriendMenu
          isOpen={menuActive}
          onClose={() => setMenuActive(false)}
          onChatCreated={(chat) => {
            console.log("Новый чат создан:", chat);
          }}
        />
      </div>
    </MobileMenuProvider>
  );
}
