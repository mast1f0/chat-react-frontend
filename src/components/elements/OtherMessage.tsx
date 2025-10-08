import type { Message } from "./UserMessage/UserMessage";

export default function OtherMessage({ message }: { message: Message }) {
  return (
    <div className="bg-white relative max-w-[500px] p-4 my-2 rounded-3xl rounded-bl-sm mr-10">
      <p style={{ color: "black" }} className="text-2xl break-words mb-5">
        {message.content}
      </p>
      <span className="absolute bottom-2 right-4 text-[#8C8C8C] text-[1rem]">
        {message.timestamp}
      </span>
    </div>
  );
}
