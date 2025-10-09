import addFriend from "/src/assets/meet-friend.png";

export default function AddFriendButton() {
  return (
    <div className="flex rounded-[50%] bg-[#E1E0E1] h-[60px] w-[60px] items-center justify-center transform transition-transform duration-200 hover:scale-125">
      <a
        href="/add"
        aria-label="Добавить друга"
        className="w-8 h-8 rounded-[44px] bg-[#E1E0E1] flex justify-center items-center no-underline "
      >
        <img
          src={addFriend}
          alt="Настройки"
          className="max-w-[51px] max-h-[51px] p-1"
        />
      </a>
    </div>
  );
}
