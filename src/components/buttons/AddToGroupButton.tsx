import { useState } from "react";
import AddIcon from "../../assets/AddToGroup.svg";

export default function AddToGroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  //Пока ниче нету, только тест
  const [users] = useState(["user1", "user2"]);

  const filteredUsers = users.filter((u) =>
    u.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center  rounded-full transition-colors"
      >
        <img src={AddIcon} alt="Добавить" className="w-6 h-6 hover:scale-125" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-opacity-10 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              Добавить в группу
            </h2>

            <input
              type="text"
              placeholder="Введите имя..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg mb-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <div
                    key={i}
                    className="p-2 cursor-pointer hover:bg-blue-100 rounded-md"
                    onClick={() => setQuery(user)}
                  >
                    {user}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500 text-center">
                  Нет совпадений
                </div>
              )}
            </div>

            <button
              className="w-full bg-[#403752] text-white rounded-lg py-2 hover:bg-[#322b41] transition-colors"
              onClick={() => {
                alert(`"${query}" добавлен!`);
                setIsOpen(false);
              }}
            >
              Добавить
            </button>
          </div>

          <style>{`
            .modal {
              transform: scale(0.8);
              opacity: 0;
              animation: appear 0.25s ease-out forwards;
            }
            @keyframes appear {
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
