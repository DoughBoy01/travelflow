/**
 * API Response Types
 * Shared between mobile and backend
 */

export interface ApiMeta {
  timestamp: string;
  requestId: string;
  version?: string;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorDetails {
  field?: string;
  message: string;
  [key: string]: unknown;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ApiErrorDetails | ApiErrorDetails[];
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  meta: ApiMeta;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export enum ApiErrorCode {
  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Validation
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Resource
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',

  // Server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Business Logic
  INSUFFICIENT_POINTS = 'INSUFFICIENT_POINTS',
  REWARD_UNAVAILABLE = 'REWARD_UNAVAILABLE',
  FEEDBACK_LIMIT_REACHED = 'FEEDBACK_LIMIT_REACHED',
}
