import settingsIcon from "/src/assets/setting-button.png";

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
      <img
        src={settingsIcon}
        alt="Настройки"
        style={{ maxWidth: 51, maxHeight: 51 }}
      />
    </a>
  );
}
