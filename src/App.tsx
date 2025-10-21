import { Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import { FontSizeSetter } from "./FontSize";
import MobileChatPage from "./pages/MobileChatPage";

function App() {
  return (
    <>
      <FontSizeSetter>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* для теста мобильной страницы */}
          <Route path="/test" element={<MobileChatPage />} />
        </Routes>
      </FontSizeSetter>
    </>
  );
}

export default App;
