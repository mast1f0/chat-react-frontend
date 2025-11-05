import { Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import MobileChatPage from "./pages/MobileChatPage";
import { FontSizeSetter } from "./FontSize";
import ErrorPage from "./pages/errorPage";
function App() {
  return (
    <>
      <FontSizeSetter>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chat/:chatId" element={<MobileChatPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </FontSizeSetter>
    </>
  );
}

export default App;
