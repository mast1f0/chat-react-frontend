import { useSearchParams } from "react-router-dom";
import "./UserPanel.css";

export default function UserPanel() {
  const [params] = useSearchParams();
  const ChatName = params.get("ChatName");
  return (
    <div className="panel">
      <h2 className="text-3xl py-4">{ChatName ? ChatName : ""}</h2>
    </div>
  );
}
