export default function BackToMainButton() {
  return (
    <div className="my-10 self-start ml-[4%]">
      <a
        href="/"
        aria-label="Настройки"
        className="w-8 h-8 rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125"
      >
        <img
          className="btn-icon"
          src="./src/assets/Back.svg"
          style={{ maxWidth: 51, maxHeight: 51 }}
        />
      </a>
    </div>
  );
}
