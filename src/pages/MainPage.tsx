import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import type { Chat } from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { MobileMenuProvider } from "../contexts/MobileMenuContext";
import { useEffect, useState } from "react";
import { API_CONFIG, apiService } from "../services/api";
import { webSocketService } from "../services/websocket";
import isLogged from "../components/scripts/IsLogged";
import { useNavigate, useSearchParams } from "react-router-dom";
import fetchWithAuth from "../components/scripts/FetchWithAuth";

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const [menuActive, setMenuActive] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleMessagesLoaded = (chatId: string, messages: any) => {
    setCurrentChatId(chatId);
    const messagesArray = Array.isArray(messages)
      ? messages
      : messages?.data || [];
    setCurrentMessages(messagesArray);
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const handleBackToChatList = () => {
    setShowChatOnMobile(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const urlChatId = searchParams.get("chat");
    if (urlChatId) {
      const loadMessagesFromUrl = async () => {
        try {
          const response = await fetchWithAuth(
            `${API_CONFIG.baseUrl}/chats/messages/all/?chat_id=${urlChatId}`
          );
          const responseData = await response.json();
          // API может возвращать либо массив напрямую, либо объект с полем data
          const messagesData = Array.isArray(responseData)
            ? responseData
            : responseData.data || [];
          setCurrentMessages(messagesData);
        } catch (error) {
          console.error("MainPage: Error loading messages from URL:", error);
        }
      };
      loadMessagesFromUrl();
    } else if (!urlChatId && currentChatId) {
      setCurrentChatId(null);
      setCurrentMessages([]);
    }
  }, [searchParams]);
  useEffect(() => {
    if (!isLogged()) {
      navigate("/login", { replace: true });
      return;
    }

    const loadChats = async () => {
      try {
        const chatsData = await apiService.getAllChats();
        setChats(chatsData);
      } catch (error) {
        console.error(error);
      }
    };

    loadChats();

    webSocketService.connect();

    const handleConnectionChange = (connected: boolean) => {
      setWsConnected(connected);
    };

    webSocketService.addConnectionHandler(handleConnectionChange);
  }, [navigate]);

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
            } md:block h-full`}
          >
            <ChatSection
              messages={currentMessages}
              chatId={currentChatId || undefined}
              onBackToChatList={isMobile ? handleBackToChatList : undefined}
              hasChatsInAside={chats.length > 0}
            />
          </div>
        </div>
        <Aside
          key={chats.length}
          chats={chats}
          onToggleMenu={toggleMenu}
          onMessagesLoaded={handleMessagesLoaded}
        />
        <MeetFriendMenu
          isOpen={menuActive}
          onClose={() => setMenuActive(false)}
          onChatCreated={async (_newChat) => {
            try {
              const chatsData = await apiService.getAllChats();
              setChats(chatsData);
            } catch (error) {
              console.error("Error refreshing chats after creation:", error);
            }
          }}
        />
      </div>
    </MobileMenuProvider>
  );
}
