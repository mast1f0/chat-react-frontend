import SettingsButton from "../../buttons/SettingsButton";
import ThreeDots from "../../buttons/Three-dots";
import UserPanel from "../UserPanel/UserPanel";
import "./Header.style.css";
import MobileHeader from "../MobileHeader";

export default function Header() {
  return (
    <>
      <header className="header">
        <SettingsButton />
        <UserPanel />
        <ThreeDots />
      </header>
      <MobileHeader />
    </>
  );
}
