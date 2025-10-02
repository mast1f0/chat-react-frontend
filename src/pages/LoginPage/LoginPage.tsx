import "./LoginPage.style.css";
import AnimatedChessBoard from "../../components/elements/board/Board";
import LoginPanel from "../../components/elements/LoginPanel/LoginPanel";
export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="form-section">
        <LoginPanel />
      </div>
      <div className="board-section">
        <AnimatedChessBoard />
      </div>
    </div>
  );
}
