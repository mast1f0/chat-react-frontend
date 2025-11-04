// API сервис для работы с чатами и сообщениями
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8091/api/v1',
  authUrl: import.meta.env.VITE_AUTH_BASE_URL || 'http://127.0.0.1:8090/api/v1',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8091/ws/updates/',
};


export interface Chat {
  Id: string;
  Name: string;
  ChatType: string;
  OwnerId: number;
}

export interface Message {
  id: string;
  senderId: number;
  chatId: string;
  content: string;
  timestamp: string;
  read: boolean;
  edited: boolean;
  editedTime: string;
}

export interface MessagesResponse {
  data: Message[];
}

export interface SendMessageRequest {
  chat_id: string;
  content: string;
}

class ApiService {
  private baseUrl = API_CONFIG.baseUrl;

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
      const response = await fetch(`${this.baseUrl}/chats/messages/all/?chat_id=${chatId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const normalizedData: MessagesResponse = Array.isArray(data)
        ? { data: data }
        : (data && data.data ? data : { data: [] });
      return normalizedData;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
