import Header from "../components/elements/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/elements/chatSection/ChatSection";
export default function MainPage() {
  const isLogged = (): boolean => {
    return localStorage.getItem("access_token") !== null;
  };

  if (!isLogged) window.location.href = "/login";
  return (
    <div>
      <Header />

      <Aside
        messages={[
          {
            name: "Ivan",
            status: "online",
            image: "https://i.pravatar.cc/40?img=1",
            lastMsg: "Последнее полученной сообщение",
          },
          {
            name: "Мария",
            status: "2d ago",
            image: "https://i.pravatar.cc/40?img=2",
            lastMsg: "dsadsa",
          },
          {
            name: "Алексей",
            status: "typing",
            image: "https://i.pravatar.cc/40?img=1",
            lastMsg: "dsadsa",
          },
          {
            name: "Мария",
            status: "now",

            image: "https://i.pravatar.cc/40?img=23",
            lastMsg: "dsadsafjdsabhgahbhfahjgfbhgbefjfgdbh",
          },
          {
            name: "Мария",
            status: "now",

            image: "https://i.pravatar.cc/40?img=23",
            lastMsg: "dsadsafjdsabhgahbhfahjgfbhgbefjfgdbh",
          },
          {
            name: "Мария",
            status: "now",

            image: "https://i.pravatar.cc/40?img=23",
            lastMsg: "dsadsafjdsabhgahbhfahjgfbhgbefjfgdbh",
          },
          {
            name: "Мария",
            status: "now",

            image: "https://i.pravatar.cc/40?img=23",
            lastMsg: "dsadsafjdsabhgahbhfahjgfbhgbefjfgdbh",
          },
          {
            name: "Мария",
            status: "now",

            image: "https://i.pravatar.cc/40?img=23",
            lastMsg: "dsadsafjdsabhgahbhfahjgfbhgbefjfgdbh",
          },
        ]}
      />
      <ChatSection />
    </div>
  );
}
