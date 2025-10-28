import "./InputMessage.style.css";
import { useState } from "react";
import micIcon from "../../../assets/mic.svg";
import scrapIcon from "../../../assets/mic.svg";
import airplaneIcon from "../../../assets/mic.svg";
interface InputMessageProps {
  onSendMessage: (text: string) => void;
}

export default function InputMessage({ onSendMessage }: InputMessageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent("");
    }
  };

  const [content, setContent] = useState("");
  return (
    <form onSubmit={handleSubmit} className="input-message__wrapper">
      <div className="input-message">
        <input
          type="text"
          id="message"
          value={content}
          placeholder="Напишите сообщение"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="input__icons">
          <img src={micIcon} className="md:select-none" alt="Голосовое" />
          <img
            src={scrapIcon}
            className="md:select-none"
            alt="Прикрепить файл"
          />
        </div>
      </div>

      <button className="send-btn">
        <img src={airplaneIcon} className="md:select-none" alt="" />
      </button>
    </form>
  );
}
