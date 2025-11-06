import type { Message } from "../../services/api";
import formatTime from "../scripts/FormatTime";
import { useState, useEffect } from "react";

export default function OtherMessage({
  message,
  isConsecutive,
}: {
  message: Message;
  isConsecutive?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="block">
      <div
        className={`bg-white relative max-w-[85%] inline-block md:max-w-[500px] min-w-[100px] p-2 rounded-3xl rounded-bl-sm ${
          isConsecutive ? "mt-1" : "my-2"
        }`}
        style={{
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
        }}
      >
        <p
          style={{ color: "black" }}
          className="text-2xs break-words mb-4 whitespace-pre-wrap ml-[3%]"
        >
          {message.content}
        </p>
        <span className="absolute bottom-1 left-1 text-[#8C8C8C] text-[0.8rem]">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
