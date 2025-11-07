import SettingsButton from "../../buttons/SettingsButton";
import UserPanel from "../UserPanel/UserPanel";
import "./Header.style.css";
import { useSearchParams } from "react-router-dom";
import AddToGroupButton from "../../buttons/AddToGroupButton";

interface HeaderProps {
  wsConnected?: boolean;
}

export default function Header({ wsConnected = false }: HeaderProps) {
  const [params] = useSearchParams();
  const chatId = params.get("chat");
  return (
    <header className="header">
      <SettingsButton />
      <UserPanel />

      <div
        className={`flex items-center gap-[8px] bg-[${
          wsConnected ? "#4ade80" : "#ef4444"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            wsConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <p className="text-[0.75rem]" style={{ color: "black" }}>
          {wsConnected ? "Online" : "Offline"}
        </p>
      </div>
      {chatId && <AddToGroupButton chatId={chatId} />}
    </header>
  );
}
