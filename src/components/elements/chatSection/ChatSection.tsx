import "./ChatSection.style.css";
import InputMessage from "../InputMessage/InputMessage";

export default function ChatSection() {
  return (
    <div
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="main-section d-flex flex-row h-100vh"
    >
      <div style={{ maxHeight: "80%", flex: 1 }}></div>
      <InputMessage />
    </div>
  );
}
