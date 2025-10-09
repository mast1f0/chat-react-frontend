import "./LoginPanel.style.css";
import { useState } from "react";

export default function LoginPanel() {
  const [isChecked, setIsChecked] = useState(false); // запоминать токен или нет
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // при проверке инвертировать
    console.log(isChecked ? "да" : "нет");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8090/api/v1/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при авторизации");
      }

      const data = await response.json();
      console.log("JWT токен:", data.access_token);
      console.log("Тип токена", data.token_type);

      if (isChecked) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);
      } else {
        sessionStorage.setItem("access_token", data.access_token);
      }
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form__name">Войти</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          id="login"
          type="text"
          placeholder="Введите логин"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-submit">
          <label htmlFor="remember">
            <input
              type="checkbox"
              id="remember"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p style={{ fontSize: "1.25rem" }}>Запомнить меня</p>
          </label>

          <a href="/getPassword" style={{ fontSize: "1.25rem" }}>
            Забыли пароль?
          </a>
        </div>

        <div className="form-submit">
          <h2 className="no-account">
            <a
              href="/registration"
              className="no-account__btn"
              style={{ fontSize: "1.25rem" }}
            >
              Нет аккаунта?
            </a>
          </h2>
          <button type="submit" className="submit-btn">
            <p style={{ fontSize: "1.25rem" }}>Войти</p>
          </button>
        </div>
      </form>
    </div>
  );
}
