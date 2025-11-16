/**
 * Mobile-specific API Types
 * Extends shared API types with mobile-specific properties
 */

export * from '@shared/types/api.types';

/**
 * API request state for mobile
 */
export interface APIRequestState<T = unknown> {
  data?: T;
  loading: boolean;
  error?: string;
  timestamp?: string;
}

/**
 * File upload progress
 */
export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  error?: string;
}

/**
 * WebSocket connection state
 */
export interface WebSocketState {
  connected: boolean;
  reconnecting: boolean;
  lastConnectedAt?: string;
  reconnectAttempts: number;
}

/**
 * Offline queue item
 */
export interface OfflineQueueItem {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  timestamp: string;
  retryCount: number;
}
