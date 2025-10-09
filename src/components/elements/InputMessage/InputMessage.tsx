import "./InputMessage.style.css";
import type { Message } from "../UserMessage/UserMessage";
import React, {useState, useRef} from "react"


export default function InputMessage() {
  // const [inputValue, setInputValue] = useState('');
  // const textareaRef = useRef(null);

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };


  // const sendMessage = () =>{
  //   onSendMessage(inputValue);
  //   setInputValue('')
  // }
  return (
    <div className="input-message__wrapper">
      <div className="input-message">
        <input type="text" id="message" placeholder="Напишите сообщение" onChange={handleInput}/>
        <div className="input__icons">
          <img src="src/assets/mic.svg" alt="Голосовое" />
          <img src="src/assets/scrap.svg" alt="Прикрепить файл" />
        </div>
      </div>

      <button className="send-btn" onclick={sendMessage(e)}>
        <img src="src/assets/airplane.svg" alt="" />
      </button>
    </div>
  );
}
