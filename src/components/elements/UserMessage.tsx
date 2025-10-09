export interface Message {
  id: string;
  chat_id: string;
  content: string;
  timestamp: string;
  read: boolean;
  edited: boolean;
  edited_time: string;
  owner_id:string;
}

export default function UserMessage({ message }: { message: Message }) {
  return (
    <div className="bg-[#5D4A7A] relative max-w-[500px] p-4 my-2 rounded-3xl rounded-br-sm flex justify-self-end">
      <p className="text-white text-2xs break-words mb-5">{message.content}</p>
      <span className="absolute bottom-1 right-1 text-white text-[0.8rem]">
        {message.timestamp}
      </span>
    </div>
  );
}
