import { useNavigate } from "react-router-dom";

export default function BackToMainButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="my-5 md:my-10 self-start ml-[4%]">
      <button
        onClick={handleBackClick}
        aria-label="Вернуться на главную"
        className="w-8 h-8 rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125 bg-transparent border-none cursor-pointer"
      >
        <img
          className="btn-icon"
          src="./src/assets/Back.svg"
          style={{ maxWidth: 51, maxHeight: 51 }}
        />
      </button>
    </div>
  );
}
