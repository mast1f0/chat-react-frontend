import "./LoginPanel.style.css";
import { useState } from "react";

export default function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://example.com/api/v1/auth/login", {
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
      console.log("JWT токен:", data.token);

      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error(error);
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
            <input type="checkbox" id="remember" />
            Запомнить меня
          </label>

          <a href="/getPassword">Забыли пароль?</a>
        </div>

        <div className="form-submit">
          <h2 className="no-account">
            <a href="">Нет аккаунта?</a>
          </h2>
          <button type="submit" className="submit-btn">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
