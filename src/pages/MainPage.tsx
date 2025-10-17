import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [menuActive, setMenuActive] = useState(false);

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
        const response = await fetch("http://localhost:8091/api/v1/chats/all/", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const chats = await response.json();
        console.log(chats);
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <Header />
        {screenSize.width <= 768 ? null : <ChatSection />}
      </div>
      <Aside onToggleMenu={toggleMenu} />
      <MeetFriendMenu
        isOpen={menuActive}
        onClose={() => setMenuActive(false)}
      />
    </div>
  );
}
