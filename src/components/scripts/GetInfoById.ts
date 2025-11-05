import type { InfoById } from "../../services/api";
import getToken from "./GetToken";

export default async function getInfoById(): Promise<InfoById[]> {
  try {
    const token = getToken();
    const response = await fetch("http://localhost:8090/api/v1/users/all", {
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

    const info = await response.json();
    if (!Array.isArray(info)) {
      return [];
    }

    const users: InfoById[] = info.map((user: any) => ({
      id: Number(user.id),
      username: String(user.username || ""),
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