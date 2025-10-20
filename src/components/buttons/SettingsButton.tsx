import { ReactSVG } from "react-svg";

export default function SettingsButton() {
  return (
    <a
      href="/settings"
      aria-label="Настройки"
      className="md:w-8 md:h-8 h-14 w-12 rounded-[15px] px-[45px] bg-[#E1E0E1] md:bg-transparent rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125"
    >
      <ReactSVG
        className="btn-icon"
        src="/src/assets/setting-button.svg"
        style={{ maxWidth: 51, maxHeight: 51 }}
      />
    </a>
  );
}
