import { ReactSVG } from "react-svg";

export default function SettingsButton() {
  return (
    <a
      href="/settings"
      aria-label="Настройки"
      className="w-8 h-8 rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125"
    >
      <ReactSVG
        className="btn-icon"
        src="/src/assets/setting-button.svg"
        style={{ maxWidth: 51, maxHeight: 51 }}
      />
    </a>
  );
}
