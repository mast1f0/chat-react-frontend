import SettingsButton from "../elements/buttons/SettingsButton";
import ThreeDots from "../elements/buttons/Three-dots";
import UserPanel from "../elements/UserPanel/UserPanel";
// import PhoneButton from "../elements/buttons/PhoneButton";
import SearchInput from "../elements/SearchInput";
import "./Header.style.css";
import AddFriendButton from "../elements/buttons/AddFriend";

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
