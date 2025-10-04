import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";

export default function ChatSection() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="main-section"
    >
      <div style={{ maxHeight: "80%", flex: 1 }}></div>
      <InputMessage />
    </div>
  );
}
