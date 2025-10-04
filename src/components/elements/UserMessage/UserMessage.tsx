export interface Message {
  id: number;
  chat_id: number;
  content: string;
  timestamp: string;
  read: boolean;
  edited: boolean;
  edited_time: string;
}
