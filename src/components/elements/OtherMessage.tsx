import type { Message } from "../../services/api";
import formatTime from "../scripts/FormatTime";

export default function OtherMessage({ message }: { message: Message }) {
  return (
    <div className="bg-white relative max-w-[500px] min-w-[100px] p-4 my-2 rounded-3xl rounded-bl-sm inline-flex">
      <p style={{ color: "black" }} className="text-2xs break-words mb-5">
        {message.Content}
      </p>
      <span className="absolute bottom-1 mr-[5px] right-1  text-[#8C8C8C] text-[0.8rem]">
        {formatTime(message.CreatedAt)}
      </span>
    </div>
  );
}
