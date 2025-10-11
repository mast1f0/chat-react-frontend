export interface Message {
  id: string;
  chat_id: string;
  content: string;
  edited: boolean;
  edited_time: string;
  read: boolean;
  sender_id: string;
  timestamp: string;
}

export default function UserMessage({ message }: { message: Message }) {
  //чтобы время было в формате часы: минуты а не iso
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-[#5D4A7A] relative max-w-[500px] min-w-[100px] p-4 my-2 rounded-3xl rounded-br-sm flex justify-self-end">
      <p className="text-white text-2xs break-words mb-5">{message.content}</p>
      <span className="absolute bottom-1 right-1 text-white text-[0.8rem]">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}
