import "./RegistrationPanel.style.css";
import { useState } from "react";

type Form = {
  username: string;
  password: string;
};

export default function RegistrationPanel() {
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  });

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return "Пароль должен быть минимум 8 символов";
    if (!/[0-9]/.test(pw)) return "Пароль должен содержать хотя бы одну цифру";
    if (!/[A-Za-z]/.test(pw)) return "Пароль должен содержать буквы";
    return null;
  };

  return (
    <div className="form-container">
      <h1 className="form__name">Зарегистрироваться</h1>
      <form>
        <input id="login" type="text" placeholder="Придумайте логин" />
        <input id="password" type="text" placeholder="Придумайте пароль" />
        <input
          id="repeat-password"
          type="text"
          placeholder="Повторите пароль"
        />
        <div className="form-submit">
          <button type="submit" className="reg-btn">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
}
