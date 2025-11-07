import { useState } from "react";
import AddIcon from "../../assets/AddToGroup.svg";
import { apiService } from "../../services/api";

interface AddToGroupButtonProps {
  chatId?: string | null;
  onSuccess?: () => void;
}

export default function AddToGroupButton({
  chatId,
  onSuccess,
}: AddToGroupButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    if (!chatId) {
      alert("Чат не выбран");
      return;
    }
    setIsOpen(true);
    setError(null);
    setSuccess(false);
    setUserId("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setSuccess(false);
    setUserId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!chatId) {
      setError("Чат не выбран");
      return;
    }

    if (!userId.trim()) {
      setError("Введите ID пользователя");
      return;
    }

    const userIdNumber = parseInt(userId.trim(), 10);
    if (isNaN(userIdNumber) || userIdNumber <= 0) {
      setError("ID пользователя должен быть положительным числом");
      return;
    }

    setLoading(true);

    try {
      await apiService.addMemberToChat({
        chat_id: chatId,
        user_id: userIdNumber,
      });

      setSuccess(true);
      setUserId("");

      // Вызываем callback для обновления данных
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 1500);
      } else {
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Ошибка при добавлении пользователя");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center justify-center rounded-full transition-colors"
        disabled={!chatId}
        title={chatId ? "Добавить пользователя в чат" : "Выберите чат"}
      >
        <img
          src={AddIcon}
          alt="Добавить в группу"
          className={`w-6 h-6 hover:scale-125 transition-transform ${
            !chatId ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-opacity-10 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-center text-[#403752]">
                Добавить пользователя в чат
              </h2>
              <button
                onClick={handleClose}
                className="text-[#8C8098] hover:text-[#403752] text-xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-[#403752] mb-2"
                >
                  ID пользователя
                </label>
                <input
                  id="userId"
                  type="number"
                  placeholder="Введите ID пользователя"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={loading}
                  min="1"
                  step="1"
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#403752] text-[#403752] placeholder-[#8C8098] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-[#8C8098] mt-1">
                  Например: 1, 2, 3...
                </p>
              </div>

              {error && (
                <div className="px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  Пользователь успешно добавлен в чат!
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#f5f4f7] text-[#8C8098] rounded-lg hover:bg-[#e5e4e7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading || !userId.trim()}
                  className="flex-1 px-4 py-2 bg-[#403752] text-white rounded-lg hover:bg-[#322b41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Добавление..." : "Добавить"}
                </button>
              </div>
            </form>

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
        </div>
      )}
    </>
  );
}
