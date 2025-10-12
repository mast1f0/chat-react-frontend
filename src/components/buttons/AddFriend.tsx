import addFriend from "/src/assets/meet-friend.png";

interface AddFriendButtonProps {
  onToggleMenu: () => void;
}

export default function AddFriendButton({
  onToggleMenu,
}: AddFriendButtonProps) {
  return (
    <div className="flex rounded-[50%] bg-[#E1E0E1] h-[60px] w-[60px] items-center justify-center transform transition-transform duration-200 hover:scale-125">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label="Добавить друга"
        className="w-8 h-8 rounded-[44px] bg-[#E1E0E1] flex justify-center items-center no-underline "
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
