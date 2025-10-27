// API сервис для работы с чатами и сообщениями

export interface Chat {
  Id: string;
  Name: string;
  ChatType: string;
  OwnerId: number;
}

export interface Message {
  Id: string;
  SenderId: number;
  ChatId: string;
  Content: string;
  CreatedAt: string;
  Read: boolean;
  Edited: boolean;
  EditedTime: string;
}

export interface MessagesResponse {
  data: Message[];
}

export interface WebSocketMessage {
  id: string;
  sender_id: number;
  chat_id: string;
  content: string;
  timestamp: string;
  read: boolean;
  edited: boolean;
  edited_time: string;
}

export interface SendMessageRequest {
  chat_id: string;
  content: string;
}

class ApiService {
  private baseUrl = 'http://127.0.0.1:8091/api/v1';

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async getAllChats(): Promise<Chat[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chats/all/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }

  async getChatMessages(chatId: string): Promise<MessagesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/messages/all/chat_id=${chatId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
