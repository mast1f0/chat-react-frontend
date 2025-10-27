export default function getToken(): string | null {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if(!token) return null;
    return token;
}