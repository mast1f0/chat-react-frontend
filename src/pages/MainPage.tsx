import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { MobileMenuProvider } from "../contexts/MobileMenuContext";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [menuActive, setMenuActive] = useState(false);
  const [chats, setChats] = useState([]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  // const isLogged = (): boolean => {
  //   return localStorage.getItem("access_token") !== null;
  // };
  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // if (!isLogged()) window.location.href = "/login";

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
          {screenSize.width <= 768 ? null : <ChatSection />}
        </div>
        <div className="flex-1 md:flex-none">
          <Aside messages={chats} onToggleMenu={toggleMenu} />
        </div>
        <MeetFriendMenu
          isOpen={menuActive}
          onClose={() => setMenuActive(false)}
        />
      </div>
    </MobileMenuProvider>
  );
}
