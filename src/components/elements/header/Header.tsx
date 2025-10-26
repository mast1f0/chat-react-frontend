import SettingsButton from "../../buttons/SettingsButton";
import ThreeDots from "../../buttons/Three-dots";
import UserPanel from "../UserPanel/UserPanel";
import "./Header.style.css";
import MobileHeader from "../MobileHeader";
import type { JWT } from "../../../pages/SettingsPage";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  let decoded: JWT | null = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Ошибка декодирования JWT:", error);
    }
  }
  return (
    <>
      <header className="header">
        <SettingsButton />
        {/* немного костылей из-за тайпскрипта */}
        <UserPanel user={decoded?.username || ""} />
        <ThreeDots />
      </header>
      <MobileHeader />
    </>
  );
}
