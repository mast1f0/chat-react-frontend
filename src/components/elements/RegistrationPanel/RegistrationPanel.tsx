import "./RegistrationPanel.style.css";
import { useState } from "react";

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
      const response = await fetch(
        "http://localhost:8090/api/v1/auth/registration/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка регистрации");
      }

      const data = await response.json();
      console.log("Регистрация успешна:", data.message);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
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
        />
        <input
          id="password"
          type="password"
          placeholder="Придумайте пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="bg-white"
        />
        <input
          id="repeat-password"
          type="password"
          placeholder="Повторите пароль"
          value={form.repeatPassword}
          onChange={(e) => setForm({ ...form, repeatPassword: e.target.value })}
          className="bg-white"
        />

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <div className="form-submit">
          <button type="submit" className="reg-btn">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
}
