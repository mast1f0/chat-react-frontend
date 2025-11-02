import SettingsButton from "../../buttons/SettingsButton";
import ThreeDots from "../../buttons/Three-dots";
import UserPanel from "../UserPanel/UserPanel";
import "./Header.style.css";
import getDecodedToken from "../../scripts/GetDecodedToken";

interface HeaderProps {
  wsConnected?: boolean;
}

export default function Header({ wsConnected = false }: HeaderProps) {
  const decoded = getDecodedToken();
  return (
    <>
      <header className="header">
        <SettingsButton />
        {/* немного костылей из-за тайпскрипта */}
        <UserPanel user={decoded?.username || ""} />

        <div
          className={`flex items-center gap-[8px] bg-[${
            wsConnected ? "#4ade80" : "#ef4444"
          }]`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              wsConnected ? "bg-green-500" : "bg-red-500"
            }]`}
          ></div>
          <p className="text-[0.75rem]" style={{ color: "black" }}>
            {wsConnected ? "Online" : "Offline"}
          </p>
        </div>
        <ThreeDots />
      </header>
    </>
  );
}
