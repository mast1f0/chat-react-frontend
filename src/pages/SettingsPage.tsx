export interface UserInfo {
  name: string;
  id: string;
}

export default function SettingsPage() {
  const exitButton = () =>{
    localStorage.removeItem("access_token");
    window.location.href = "/login"
  }

  return (
    <div className="bg-[#f5f4f7] h-screen flex flex-col items-center pt-10">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-[500px]">
        <img
          src=""
          alt=""
          className="w-[120px] h-[120px] rounded-full bg-gray-300 mb-4"
        />
        <h1 style={{color:"black"}} className="text-black text-3xl font-semibold mb-1">Имя</h1>
        <h3 className="text-gray-600 text-lg mb-6">id</h3>

        <button onClick={() => exitButton()} className="bg-[#403752] text-white text-lg px-6 py-2 rounded-xl hover:bg-red-800 transition-colors">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
