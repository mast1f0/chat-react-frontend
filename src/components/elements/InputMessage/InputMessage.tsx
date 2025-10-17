import "./InputMessage.style.css";
import { useState } from "react";

interface InputMessageProps {
  onSendMessage: (text: string) => void;
}

export default function InputMessage({ onSendMessage }: InputMessageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(content);
  };

  const [content, setContent] = useState("");
  return (
    <form onSubmit={handleSubmit} className="input-message__wrapper">
      <div className="input-message">
        <input
          type="text"
          id="message"
          placeholder="Напишите сообщение"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="input__icons">
          <img src="src/assets/mic.svg" className="md:select-none" alt="Голосовое" />
          <img src="src/assets/scrap.svg" className="md:select-none" alt="Прикрепить файл" />
        </div>
      </div>

      <button className="send-btn">
        <img src="src/assets/airplane.svg" className="md:select-none" alt="" />
      </button>
    </form>
  );
}
