import "./RegistrationPanel.style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "../../../services/api";

type Form = {
  username: string;
  password: string;
  repeatPassword: string;
};

export default function RegistrationPanel() {
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return "Пароль должен быть минимум 8 символов";
    if (!/[0-9]/.test(pw)) return "Пароль должен содержать хотя бы одну цифру";
    if (!/[A-Za-z]/.test(pw)) return "Пароль должен содержать буквы";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pwError = validatePassword(form.password);
    if (pwError) {
      setError(pwError);
      return;
    }

    if (form.password !== form.repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setError(null);

    try {
      // Регистрация
      const response = await fetch(`${API_CONFIG.authUrl}/auth/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка регистрации");
      }

      const data = await response.json();
      console.log("Регистрация успешна:", data.message);

      try {
        const loginResponse = await fetch(`${API_CONFIG.authUrl}/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        });

        if (!loginResponse.ok) {
          throw new Error("Ошибка при авторизации после регистрации");
        }

        const loginData = await loginResponse.json();
        console.log("Автоматический логин выполнен");

        localStorage.setItem("access_token", loginData.access_token);
        navigate("/", { replace: true });
      } catch (loginErr) {
        console.error(loginErr);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form__name">Зарегистрироваться</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          id="login"
          type="text"
          placeholder="Придумайте логин"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="bg-white"
          autoComplete="name webauthn"
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Придумайте пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="bg-white"
          autoComplete="new-password webauthn"
          required
        />
        <input
          id="repeat-password"
          type="password"
          placeholder="Повторите пароль"
          value={form.repeatPassword}
          onChange={(e) => setForm({ ...form, repeatPassword: e.target.value })}
          className="bg-white"
          autoComplete="new-password webauthn"
          required
        />

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginBlock: 0 }}>
            {error}
          </p>
        )}

        <div className="form-submit">
          <button type="submit" className="reg-btn">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
}
