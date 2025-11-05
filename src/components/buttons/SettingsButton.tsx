import settingsIcon from "../../assets/setting-button.svg";
export default function SettingsButton() {
  return (
    <a
      href="/settings"
      aria-label="Настройки"
      className="md:w-8 md:h-8 h-14 flex-1 flex-shrink min-w-0 basis-0 rounded-[15px] bg-[#E1E0E1] md:bg-transparent rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-110 md:hover:scale-125 overflow-hidden"
    >
      <img
        className="btn-icon flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
        src={settingsIcon}
      />
    </a>
  );
}
