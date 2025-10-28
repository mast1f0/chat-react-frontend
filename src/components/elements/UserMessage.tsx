import formatTime from "../scripts/FormatTime";
import type { Message } from "../../services/api";

export default function UserMessage({ message }: { message: Message }) {
  return (
    <div className="bg-[#5D4A7A] h-auto relative max-w-[500px] min-w-[100px] p-4 my-2 rounded-3xl rounded-br-sm flex justify-self-end">
      <p className="text-white text-2xs break-words mb-5">{message.Content}</p>
      <span className="absolute bottom-1 right-1 text-white text-[0.8rem]">
        {formatTime(message.CreatedAt)}
      </span>
    </div>
  );
}
