import formatTime from "../scripts/FormatTime";
import type { Message } from "../../services/api";
import { useState, useEffect } from "react";

export default function UserMessage({
  message,
  isConsecutive,
  name = "",
}: {
  message: Message;
  isConsecutive?: boolean;
  name?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // это для анимации
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-[#5D4A7A] h-auto relative max-w-[500px] min-w-[100px] p-4 rounded-3xl rounded-br-sm justify-self-end ${
        isConsecutive ? "mt-1" : "my-2"
      }`}
      style={{
        transform: isVisible ? "translateX(0)" : "translateX(30px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
      }}
    >
      {name && <p className="">{name}</p>}
      <p className="text-white text-2xs break-words mb-5 whitespace-pre-wrap">
        {message.content}
      </p>
      <span className="absolute bottom-1 right-1 text-white text-[0.8rem]">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}
