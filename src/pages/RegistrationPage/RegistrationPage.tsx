import AnimatedChessBoard from "../../components/elements/board/Board";
import RegistrationPanel from "../../components/elements/RegistrationPanel/RegistrationPanel";
import "./RegistrationPage.style.css";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="form-section">
        <RegistrationPanel />
      </div>
      <div className="board-section">
        <AnimatedChessBoard />
      </div>
    </div>
  );
}
