import SettingsButton from "../../buttons/SettingsButton";
import ThreeDots from "../../buttons/Three-dots";
import UserPanel from "../UserPanel/UserPanel";
import SearchInput from "../SearchInput";
import "./Header.style.css";
import AddFriendButton from "../../buttons/AddFriend";

interface HeaderProps {
  onToggleMenu: () => void;
}

export default function Header({ onToggleMenu }: HeaderProps) {
  return (
    <header className="header xl:invisible">
      <SettingsButton />
      <UserPanel />
      <ThreeDots />
      <div className="search-section">
        <SearchInput />
        <AddFriendButton onToggleMenu={onToggleMenu} />
      </div>
    </header>
  );
}
