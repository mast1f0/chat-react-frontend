import addFriend from "/src/assets/meet-friend.png";

interface AddFriendButtonProps {
  onToggleMenu: () => void;
}

export default function AddFriendButton({
  onToggleMenu,
}: AddFriendButtonProps) {
  return (
    <div className="flex md:mr-5  rounded-full bg-[#E1E0E1] h-[60px] w-[60px] items-center justify-center md:mx-2 transform transition-transform duration-200 hover:scale-125">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label="Добавить друга"
        className="w-15 select-none h-15 rounded-[44px] bg-[#E1E0E1] flex justify-center items-center"
      >
        <img
          src={addFriend}
          alt="Настройки"
          className="max-w-[51px] max-h-[51px] p-1"
        />
      </button>
    </div>
  );
}
