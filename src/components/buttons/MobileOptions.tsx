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
            <div className="flex flex-row items-center gap-2 sm:gap-3.5 w-full">
              <button className="bg-[#E1E0E1] rounded-[15px] flex-1 flex-shrink min-w-0 basis-0 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-110 overflow-hidden">
                <span className="text-sm sm:text-base truncate px-1">Some</span>
              </button>
              <button className="bg-[#E1E0E1] rounded-[15px] flex-1 flex-shrink min-w-0 basis-0 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-110 overflow-hidden">
                <span className="text-sm sm:text-base truncate px-1">Some</span>
              </button>
              <SettingsButton />
              <button
                className="bg-[#E1E0E1] rounded-[15px] flex-1 flex-shrink min-w-0 basis-0 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-110 overflow-hidden"
                onClick={handleMenu}
              >
                <img
                  src={meetFriendIcon}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-contain"
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
