import { useState } from "react";
import MeetFriendMenu from "../elements/MeetFriendMenu";
import { useMobileMenu } from "../../contexts/MobileMenuContext";
import SettingsButton from "./SettingsButton";
import threeDotsIcon from "../../assets/three-dots.svg";
import meetFriendIcon from "../../assets/meet-friend.png";

export default function MobileOptions() {
  const [isOpen, setOpen] = useState(false);
  const { setIsMobileMenuOpen } = useMobileMenu();

  const handleClick = () => {
    const newState = !isOpen;
    setOpen(newState);
    setIsMobileMenuOpen(newState);
  };
  const [menuIsActive, setMenuActive] = useState(false);

  const handleMenu = () => {
    setMenuActive(!menuIsActive);
  };
  return (
    <>
      <div className="flex flex-col items-center relative">
        <button
          onClick={handleClick}
          aria-label="Настройки"
          className="bg-[#E1E0E1] rounded-[15px] py-2 px-3 flex items-center justify-center transition-transform duration-200 hover:scale-110"
        >
          <img
            src={threeDotsIcon}
            alt="Настройки"
            className="w-11 h-11 object-contain"
          />
        </button>
        {isOpen && (
          <div className="fixed flex flex-col w-screen top-[13%] right-0 justify-self-center px-2 z-30">
            <div className="flex flex-row items-center gap-3.5 w-full">
              <button className="bg-[#E1E0E1] rounded-[15px] flex-1 h-14 w-12 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                <span className="text-base">Some</span>
              </button>
              <button className="bg-[#E1E0E1] rounded-[15px] flex-1 h-14 w-12 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                <span className="text-base">Some</span>
              </button>
              <SettingsButton />
              <button
                className="bg-[#E1E0E1] rounded-[15px] flex-1 h-14 flex w-12 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={handleMenu}
              >
                <img
                  src={meetFriendIcon}
                  className="w-10 h-10"
                  alt=""
                />
              </button>
            </div>
          </div>
        )}
      </div>
      <MeetFriendMenu
        isOpen={menuIsActive}
        onClose={() => setMenuActive(false)}
      />
    </>
  );
}
