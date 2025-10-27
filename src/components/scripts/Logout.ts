// Функция для выхода из аккаунта
export default function logout() {
  // Удаляем токены из localStorage и sessionStorage
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
  
  // Перенаправляем на страницу входа
  window.location.href = "/login";
}