import { useEffect, useState, useRef } from "react";
import FontSizeControl from "../components/elements/FontSizeEdit";
import BackToMainButton from "../components/buttons/BackToMainButton";
import getDecodedToken from "../components/scripts/GetDecodedToken";
import logout from "../components/scripts/Logout";
import pencilIcon from "../assets/tabler_pencil.svg";

export interface JWT {
  sub?: string;
  access_token: string;
  username: string;
  exp?: number;
  iat?: number;
}

export default function SettingsPage() {
  const [user, setUser] = useState<JWT>({ access_token: "", username: "" });
  const [edit, isEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const nameRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const decodedToken = getDecodedToken();

    if (decodedToken) {
      setUser(decodedToken);
      setNewName(decodedToken.username);
    } else {
      // Fallback для случая, когда нет токена
      const getName = localStorage.getItem("username") || "Имя";
      const getId = `@${getName}`;
      setUser({ username: getName, access_token: getId });
      setNewName(getName);
    }
  }, []);

  useEffect(() => {
    if (edit && inputRef.current && nameRef.current) {
      setTimeout(() => {
        const width = nameRef.current?.offsetWidth;
        if (width && width > 0 && inputRef.current) {
          inputRef.current.style.width = `${width}px`;
        }
      }, 0);
    }
  }, [edit, user.username]);

  const saveChanges = () => {
    setUser({ ...user, username: newName });
    localStorage.setItem("username", newName);
    isEditing(false);
  };

  return (
    <div className="bg-[#f5f4f7] h-screen flex flex-col items-center pt-10">
      <div className="flex w-full max-h-[10%] items-center justify-items-start">
        <BackToMainButton />
      </div>
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-[90%]">
        {/* для аватара*/}
        <div className="w-[120px] h-[120px] rounded-full bg-gray-300 mb-4" />

        <div className="flex items-center justify-center gap-2 mb-2">
          <h1
            ref={nameRef}
            style={{
              color: "black",
              visibility: edit ? "hidden" : "visible",
              position: edit ? "absolute" : "static",
            }}
            className="text-black text-3xl font-semibold mb-1"
          >
            {user.username}
          </h1>
          {edit && (
            <input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="text-2xl text-center font-semibold mb-2 border-b-2 border-[#403752] focus:outline-none focus:border-indigo-500"
              placeholder="Введите имя"
            />
          )}

          {!edit && (
            <button
              onClick={() => isEditing(true)}
              className="p-1 text-sm bg-gray-200 rounded-full hover:scale-125 flex-shrink-0"
              title="Редактировать"
            >
              <img src={pencilIcon} alt="" />
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

        <h3 className="text-gray-600 text-lg mb-6">{`@${user.username}`}</h3>

        <button
          onClick={() => logout()}
          className="bg-[#403752] text-white text-lg px-6 py-2 rounded-xl  transform transition-transform duration-200 hover:bg-red-800  hover:scale-125 "
        >
          Выйти из аккаунта
        </button>
      </div>
      <FontSizeControl />
    </div>
  );
}
