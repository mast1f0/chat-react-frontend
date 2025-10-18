import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
import MeetFriendMenu from "../components/elements/MeetFriendMenu";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [menuActive, setMenuActive] = useState(false);

  // Тестовые данные для Aside
  const testMessages = [
    { id: "1", name: "Общий чат", owner_id: "admin" },
    { id: "2", name: "Работа", owner_id: "user1" },
    { id: "3", name: "Друзья", owner_id: "user2" },
    { id: "4", name: "Семья", owner_id: "user3" },
    { id: "5", name: "Изучение React", owner_id: "user4" },
    { id: "6", name: "Проект ChatApp", owner_id: "user5" },
    { id: "7", name: "Игровой чат", owner_id: "user6" },
    { id: "8", name: "Новости", owner_id: "user7" },
    { id: "9", name: "Техподдержка", owner_id: "support" },
    { id: "10", name: "Мемы и шутки", owner_id: "user8" },
    { id: "11", name: "Спорт", owner_id: "user9" },
    { id: "12", name: "Музыка", owner_id: "user10" },
    { id: "13", name: "Фильмы", owner_id: "user11" },
    { id: "14", name: "Книги", owner_id: "user12" },
    { id: "15", name: "Путешествия", owner_id: "user13" }
  ];

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
    <div className="flex h-full md:h-screen flex-col md:flex-row">
      <div className="flex flex-col md:flex-1">
        <Header />
        {screenSize.width <= 768 ? null : <ChatSection />}
      </div>
      <div className="flex-1 md:flex-none">
        <Aside messages={testMessages} onToggleMenu={toggleMenu} />
      </div>
      <MeetFriendMenu
        isOpen={menuActive}
        onClose={() => setMenuActive(false)}
      />
    </div>
  );
}
