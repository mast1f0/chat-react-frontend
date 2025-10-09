 import "./InputMessage.style.css";

export default function InputMessage() {
  return (
    <div className="input-message__wrapper">
      <div className="input-message">
        <input type="text" id="message" placeholder="Напишите сообщение" />
        <div className="input__icons">
          <img src="src/assets/mic.svg" alt="Голосовое" />
          <img src="src/assets/scrap.svg" alt="Прикрепить файл" />
        </div>
      </div>

      <button className="send-btn">
        <img src="src/assets/airplane.svg" alt="" />
      </button>
    </div>
  );
}