/**
 * WebSocket Service
 * Handles real-time communication with backend via Socket.io
 */

import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/constants';
import { WebSocketState } from '@/types/api.types';

class SocketServiceClass {
  private socket: Socket | null = null;
  private state: WebSocketState = {
    connected: false,
    reconnecting: false,
    reconnectAttempts: 0,
  };
  private listeners: Map<string, ((...args: any[]) => void)[]> = new Map();

  /**
   * Connect to WebSocket server
   */
  connect(token: string): void {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    this.socket = io(API_CONFIG.WS_URL, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupEventHandlers();
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.state = {
      connected: false,
      reconnecting: false,
      reconnectAttempts: 0,
    };
  }

  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.state.connected = true;
      this.state.reconnecting = false;
      this.state.reconnectAttempts = 0;
      this.state.lastConnectedAt = new Date().toISOString();
      this.emit('connection:state', this.state);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.state.connected = false;
      this.emit('connection:state', this.state);
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('Socket reconnecting...');
      this.state.reconnecting = true;
      this.state.reconnectAttempts += 1;
      this.emit('connection:state', this.state);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Socket reconnection failed');
      this.state.reconnecting = false;
      this.emit('connection:state', this.state);
    });
  }

  /**
   * Subscribe to an event
   */
  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Unsubscribe from an event
   */
  off(event: string, callback?: (...args: any[]) => void): void {
    if (callback) {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }

      if (this.socket) {
        this.socket.off(event, callback);
      }
    } else {
      this.listeners.delete(event);

      if (this.socket) {
        this.socket.off(event);
      }
    }
  }

  /**
   * Emit an event
   */
  emit(event: string, ...args: any[]): void {
    if (this.socket?.connected) {
      this.socket.emit(event, ...args);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  }

  /**
   * Get connection state
   */
  getState(): WebSocketState {
    return this.state;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.state.connected;
  }
}

export const SocketService = new SocketServiceClass();
