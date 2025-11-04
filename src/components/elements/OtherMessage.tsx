import type { Message } from "../../services/api";
import formatTime from "../scripts/FormatTime";

export default function OtherMessage({ message, isConsecutive }: { message: Message; isConsecutive?: boolean }) {
  return (
    <div className={`bg-white relative max-w-[500px] min-w-[100px] p-4 rounded-3xl rounded-bl-sm ${isConsecutive ? 'mt-1' : 'my-2'}`}>
      <p style={{ color: "black" }} className="text-2xs break-words mb-5 whitespace-pre-wrap">
        {message.content}
      </p>
      <span className="absolute bottom-1 mr-[5px] right-1  text-[#8C8C8C] text-[0.8rem]">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}
