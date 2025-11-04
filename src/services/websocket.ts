// WebSocket сервис для работы с сообщениями в реальном времени

import getToken from '../components/scripts/GetToken';
import type {Message , SendMessageRequest } from './api';

export type MessageHandler = (message: any) => void; // WebSocket сообщения приходят в snake_case формате
export type ConnectionHandler = (connected: boolean) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private connectionHandlers: Set<ConnectionHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(): void {
    try {
      const token = getToken() || "";

      console.log('Attempting WebSocket connection...');
      console.log('Token found:', token.substring(0, 20) + '...');

      // Подключаемся к WebSocket серверу
      const wsUrl = 'ws://127.0.0.1:8091/ws/updates/';
      
      console.log('WebSocket URL:', wsUrl);
      console.log('Token found:', token.substring(0, 30) + '...');
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected to:', wsUrl);
        console.log('Sending access token in first message...');
        
        // Отправляем токен в первом сообщении
        const authMessage = {
          type: 'access_token',
          token: token
        };
        
        // console.log('Sending auth message:', { type: authMessage.type, token: token.substring(0, 20) + '...' });
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(authMessage));
          console.log('Auth message sent successfully');
        }
        
        this.reconnectAttempts = 0;
        this.notifyConnectionHandlers(true);
      };

      this.ws.onmessage = (event) => {
        try {
          // WebSocket сообщения приходят в snake_case формате, не в формате Message интерфейса
          const message: any = JSON.parse(event.data);
          this.notifyMessageHandlers(message);
        } catch (error) {
          console.error(error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        console.log('Close event details:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        this.notifyConnectionHandlers(false);
        
        // Попытка переподключения
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        console.error('WebSocket readyState:', this.ws?.readyState);
        console.error('WebSocket URL:', wsUrl);
        console.error('Token length:', token.length);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendMessage(message: SendMessageRequest): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Sending WebSocket message:', message);
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected. ReadyState:', this.ws?.readyState);
    }
  }

  addMessageHandler(handler: MessageHandler): void {
    this.messageHandlers.add(handler);
  }

  removeMessageHandler(handler: MessageHandler): void {
    this.messageHandlers.delete(handler);
  }

  addConnectionHandler(handler: ConnectionHandler): void {
    this.connectionHandlers.add(handler);
  }

  removeConnectionHandler(handler: ConnectionHandler): void {
    this.connectionHandlers.delete(handler);
  }

  private notifyMessageHandlers(message: Message): void {
    this.messageHandlers.forEach(handler => handler(message));
  }

  private notifyConnectionHandlers(connected: boolean): void {
    this.connectionHandlers.forEach(handler => handler(connected));
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const webSocketService = new WebSocketService();
