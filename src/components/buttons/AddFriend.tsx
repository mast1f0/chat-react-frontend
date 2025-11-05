import addFriend from "../../assets/meet-friend.png";

interface AddFriendButtonProps {
  onToggleMenu: () => void;
}

export default function AddFriendButton({
  onToggleMenu,
}: AddFriendButtonProps) {
  return (
    <div className="flex rounded-full bg-[#E1E0E1] h-[60px] w-[60px] select-none items-center justify-center md:mx-2 transform transition-transform duration-200 hover:scale-125">
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label="Добавить друга"
        className="w-[55px] h-[55px] rounded-full  flex justify-center items-center"
      >
        <img
          src={addFriend}
          alt="Добавить друга"
          className="w-[35px] h-[35px] object-contain"
        />
      </button>
    </div>
  );
}
