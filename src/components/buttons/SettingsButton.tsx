import { ReactSVG } from "react-svg";

export default function SettingsButton() {
  return (
    <a
      href="/settings"
      aria-label="Настройки"
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
      }}
    >
      <ReactSVG
        className="btn-icon"
        src="/src/assets/setting-button.svg"
        style={{ maxWidth: 51, maxHeight: 51 }}
      />
    </a>
  );
}
