import Header from "../components/header/Header";
import Aside from "../components/elements/Aside";
import ChatSection from "../components/chatSection/ChatSection";
//тестовые данные
export default function MainPage() {
  return (
    <>
      <Header />

      <Aside
      // messages={[
      //   {
      //     name: "Ivan",
      //     status: "online",
      //     image: "https://i.pravatar.cc/40?img=1",
      //   },
      //   {
      //     name: "Мария",
      //     status: "2d ago",
      //     image: "https://i.pravatar.cc/40?img=2",
      //   },
      //   {
      //     name: "Алексей",
      //     status: "typing",
      //     image: "https://i.pravatar.cc/40?img=1",
      //   },
      //   {
      //     name: "Мария",
      //     status: "now",
      //     image: "https://i.pravatar.cc/40?img=23",
      //   },
      // ]}
      />
      <ChatSection />
    </>
  );
}
