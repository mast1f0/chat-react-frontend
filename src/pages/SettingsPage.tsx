export interface UserInfo {
  name: string;
  id: string;
}

export default function SettingsPage() {
  return (
    <div className="bg-[#f5f4f7] h-screen">
      <div className="profile-block" style={{ color: "black" }}>
        <img src="" alt="" />
        <h1 style={{ color: "black" }}>Имя</h1>
        <h3 className="text-black">id</h3>

        <button className="text-red w-2 h-5 bg-[#]">Выйти из аккаунта</button>
      </div>
    </div>
  );
}
