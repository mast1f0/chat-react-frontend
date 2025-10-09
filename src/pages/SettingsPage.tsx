import { useEffect, useState } from "react";
import FontSizeControl from "../components/elements/FontSizeEdit";
export interface UserInfo {
  name: string;
  id: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserInfo>({ name: "", id: "" });
  const [edit, isEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const getName = localStorage.getItem("username") || "Имя";
    const getId = "id"; // потом дописать айдишник
    setUser({ name: getName, id: getId });
    setNewName(getName);
  }, []);

  const saveChanges = () => {
    setUser({ ...user, name: newName });
    localStorage.setItem("username", newName);
    isEditing(false);
  };

  const exitButton = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-[#f5f4f7] h-screen flex flex-col items-center pt-10">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-[90%]">
        <img
          src=""
          alt=""
          className="w-[120px] h-[120px] rounded-full bg-gray-300 mb-4"
        />

        <div className="flex items-center gap-2 mb-2">
          {edit ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="text-2xl text-center font-semibold mb-2 border-b-2 border-[#403752] focus:outline-none focus:border-indigo-500"
              placeholder="Введите имя"
            />
          ) : (
            <h1
              style={{ color: "black" }}
              className="text-black text-3xl font-semibold mb-1"
            >
              {user.name}
            </h1>
          )}

          {!edit && (
            <button
              onClick={() => isEditing(true)}
              className="p-1 text-sm bg-gray-200 rounded-full hover:scale-125"
              title="Редактировать"
            >
              <img src="./src/assets/tabler_pencil.svg" alt="" />
            </button>
          )}
        </div>

        {edit ? (
          <>
            <button
              onClick={saveChanges}
              className="bg-green-600 text-white text-lg px-4 py-2 rounded-xl hover:bg-green-700  transform transition-transform duration-200 hover:scale-125"
            >
              Сохранить
            </button>
            <button
              onClick={() => isEditing(false)}
              className="bg-[#403752] text-white text-lg px-4 py-2 rounded-xl hover:bg-gray-500  mt-2  transform transition-transform duration-200 hover:scale-125"
            >
              Отмена
            </button>
          </>
        ) : null}

        <h3 className="text-gray-600 text-lg mb-6">{user.id}</h3>

        <button
          onClick={exitButton}
          className="bg-[#403752] text-white text-lg px-6 py-2 rounded-xl  transform transition-transform duration-200 hover:bg-red-800  hover:scale-125 "
        >
          Выйти из аккаунта
        </button>
      </div>

      <FontSizeControl/>
    </div>
  );
}
