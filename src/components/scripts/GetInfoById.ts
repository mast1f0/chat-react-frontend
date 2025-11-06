import { API_CONFIG, type InfoById } from "../../services/api";
import getToken from "./GetToken";
export default async function getInfoById(chatId: string): Promise<InfoById[]> {
  try {
    const token = getToken();
    const response = await fetch(`${API_CONFIG.authUrl}/chats/members/?chat_id=${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(response.status);
      return [];
    }
    const usersListen = await response.json();
    const usersIds = usersListen.map((userEl: any) => userEl.user_id);

    console.log(usersIds) // TODO дальше с этими id надо работать. Отправляем ids в auth - в ответ получаем список юзеров

    const info = await response.json();
    if (!Array.isArray(info)) {
      return [];
    }

    const users: InfoById[] = info.map((user: InfoById) => ({
      id: Number(user.id),
      username: user.username || "",
      name: user.name ?? null, 
      family: user.family ?? null,
    }));

    localStorage.setItem("users", JSON.stringify(users));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}