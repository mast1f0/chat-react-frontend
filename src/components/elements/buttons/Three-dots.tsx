import Dots from "/src/assets/three-dots.png";

export default function ThreeDots() {
  return (
    <a href="/settings" aria-label="Настройки">
      <img src={Dots} alt="" className="" style={{ maxHeight: 51 }} />
    </a>
  );
}
