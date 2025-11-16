/**
 * App Configuration Constants
 */

import Config from 'react-native-config';

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: Config.API_BASE_URL || 'http://localhost:3000',
  WS_URL: Config.WS_URL || 'ws://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Feature Flags
 */
export const FEATURES = {
  VOICE_INPUT: Config.ENABLE_VOICE_INPUT === 'true',
  PHOTO_UPLOAD: Config.ENABLE_PHOTO_UPLOAD === 'true',
  HAPTICS: Config.ENABLE_HAPTICS === 'true',
  ANALYTICS: Config.ENABLE_ANALYTICS === 'true',
} as const;

/**
 * File Upload Limits
 */
export const UPLOAD_LIMITS = {
  MAX_PHOTO_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VOICE_DURATION: 120, // 120 seconds
  MAX_VOICE_SIZE: 25 * 1024 * 1024, // 25MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/heic'],
  ALLOWED_AUDIO_TYPES: ['audio/mp4', 'audio/mpeg', 'audio/wav'],
} as const;

/**
 * Validation Rules
 */
export const VALIDATION = {
  MIN_TEXT_LENGTH: 3,
  MAX_TEXT_LENGTH: 500,
  MIN_RATING: 1,
  MAX_RATING: 5,
} as const;

/**
 * Timing Constants
 */
export const TIMING = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  FEEDBACK_TIMEOUT: 2000, // Visual feedback duration
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
} as const;

/**
 * Cache Configuration
 */
export const CACHE = {
  USER_DATA_TTL: 5 * 60 * 1000, // 5 minutes
  FEEDBACK_LIST_TTL: 2 * 60 * 1000, // 2 minutes
  LEADERBOARD_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
