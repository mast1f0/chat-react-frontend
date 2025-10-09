import Dots from "/src/assets/three-dots.png";

export default function ThreeDots() {
  return (
    <a href="/settings" aria-label="Настройки" className="transform transition-transform duration-200 hover:scale-125">
      <img src={Dots} alt="" className="" style={{ maxHeight: 51 }} />
    </a>
  );
}
