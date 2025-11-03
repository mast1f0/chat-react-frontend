import "./InputMessage.style.css";
import { useState } from "react";
import micIcon from "../../../assets/mic.svg";
import scrapIcon from "../../../assets/scrap.svg";
import airplaneIcon from "../../../assets/airplane.svg";
interface InputMessageProps {
  onSendMessage: (text: string) => void;
}

export default function InputMessage({ onSendMessage }: InputMessageProps) {
  const handleSubmit = async (e: React.FormEvent) => {
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
          <img
            src={scrapIcon}
            className="md:select-none"
            alt="Прикрепить файл"
          />
        </div>
      </div>

      <button type="submit" className="send-btn">
        {content ? (
          <img src={airplaneIcon} className="md:select-none" alt="" />
        ) : (
          <img src={micIcon} className="md:select-none" alt="" />
        )}
      </button>
    </form>
  );
}
