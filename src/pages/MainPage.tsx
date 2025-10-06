import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";

export default function MainPage() {
  const isLogged = (): boolean => {
    return localStorage.getItem("access_token") !== null;
  };

  if (!isLogged()) window.location.href = "/login";

  //получаем чаты для панельки сбоку
  async function getChats() {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8090/api/v1/chats/all", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
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
  return (
    <div>
      <Header />

      <Aside />
      <ChatSection />
    </div>
  );
}
