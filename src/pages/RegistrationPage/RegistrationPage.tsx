import AnimatedChessBoard from "../../components/elements/board/Board";
import RegistrationPanel from "../../components/RegistrationPanel/RegistrationPanel";
import "./RegistrationPage.style.css";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="board-section" style={{ marginLeft: "20%" }}>
        <AnimatedChessBoard />
      </div>
      <div className="form-section">
        <RegistrationPanel />
      </div>
    </div>
  );
}
