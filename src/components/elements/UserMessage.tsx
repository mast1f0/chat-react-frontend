import formatTime from "../scripts/FormatTime";
import type { Message } from "../../services/api";

export default function UserMessage({ message, isConsecutive }: { message: Message; isConsecutive?: boolean }) {
  return (
    <div className={`bg-[#5D4A7A] h-auto relative max-w-[500px] min-w-[100px] p-4 rounded-3xl rounded-br-sm justify-self-end ${isConsecutive ? 'mt-1' : 'my-2'}`}>
      <p className="text-white text-2xs break-words mb-5 whitespace-pre-wrap">{message.Content}</p>
      <span className="absolute bottom-1 right-1 text-white text-[0.8rem]">
        {formatTime(message.CreatedAt)}
      </span>
    </div>
  );
}
