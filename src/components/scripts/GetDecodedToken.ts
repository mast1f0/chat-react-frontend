import { jwtDecode } from "jwt-decode";
import type { JWT } from "../../pages/SettingsPage";
import getToken from "./GetToken";

export default function getDecodedToken(): JWT | null {
    const token = getToken();
    if (!token) return null;
    
    try {
        return jwtDecode<JWT>(token);
    } catch (error) {
        console.error("Ошибка декодирования JWT:", error);
        return null;
    }
}