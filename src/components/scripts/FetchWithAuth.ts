import getToken from "./GetToken";

interface FetchWithAuthOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

//принимает путь, отправляет запрос с JWT
export default async function fetchWithAuth(path: string, options: FetchWithAuthOptions = {}){
    const token = getToken();
    if (!token) {
        throw new Error("No token available");
    }
    
    const response = await fetch(path, {
            method: options.method || "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
              ...options.headers,
            },
            body: options.body,
    });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    return response;
}