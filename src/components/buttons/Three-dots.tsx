import Dots from "../../assets/three-dots.svg";
import { ReactSVG } from "react-svg";

export default function ThreeDots() {
  return (
    <a href="/settings" aria-label="Настройки" className="transform transition-transform duration-200 hover:scale-125">
      <ReactSVG src={Dots} style={{ maxHeight: 51 }} />
    </a>
  );
}
