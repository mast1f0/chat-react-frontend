import SettingsButton from "../../buttons/SettingsButton";
import ThreeDots from "../../buttons/Three-dots";
import UserPanel from "../UserPanel/UserPanel";
import SearchInput from "../SearchInput";
import "./Header.style.css";
import AddFriendButton from "../../buttons/AddFriend";

export default function Header() {
  return (
    <header className="header">
      <SettingsButton />
      <UserPanel />
      <ThreeDots />
      <div className="search-section">
        <SearchInput />
        <AddFriendButton />
      </div>
    </header>
  );
}
