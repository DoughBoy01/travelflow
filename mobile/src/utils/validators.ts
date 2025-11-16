/**
 * Validation Utilities
 * Form validation helpers
 */

import { VALIDATION, UPLOAD_LIMITS } from '@/constants';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate feedback text length
 */
export const isValidFeedbackText = (text: string): { valid: boolean; error?: string } => {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Feedback text is required' };
  }

  if (text.length < VALIDATION.MIN_TEXT_LENGTH) {
    return {
      valid: false,
      error: `Feedback must be at least ${VALIDATION.MIN_TEXT_LENGTH} characters`,
    };
  }

  if (text.length > VALIDATION.MAX_TEXT_LENGTH) {
    return {
      valid: false,
      error: `Feedback cannot exceed ${VALIDATION.MAX_TEXT_LENGTH} characters`,
    };
  }

  return { valid: true };
};

/**
 * Validate star rating
 */
export const isValidRating = (rating: number): boolean => {
  return (
    rating >= VALIDATION.MIN_RATING &&
    rating <= VALIDATION.MAX_RATING &&
    Number.isInteger(rating)
  );
};

/**
 * Validate emoji selection
 */
export const isValidEmoji = (emoji: string): boolean => {
  // Basic emoji validation (checks if string contains emoji characters)
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(emoji);
};

/**
 * Validate file size for photo uploads
 */
export const isValidPhotoSize = (sizeInBytes: number): { valid: boolean; error?: string } => {
  if (sizeInBytes > UPLOAD_LIMITS.MAX_PHOTO_SIZE) {
    const maxSizeMB = UPLOAD_LIMITS.MAX_PHOTO_SIZE / (1024 * 1024);
    return {
      valid: false,
      error: `Photo size cannot exceed ${maxSizeMB}MB`,
    };
  }
  return { valid: true };
};

/**
 * Validate photo file type
 */
export const isValidPhotoType = (mimeType: string): { valid: boolean; error?: string } => {
  if (!UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: 'Invalid photo format. Please use JPEG, PNG, or HEIC',
    };
  }
  return { valid: true };
};

/**
 * Validate voice recording duration
 */
export const isValidVoiceDuration = (durationInSeconds: number): { valid: boolean; error?: string } => {
  if (durationInSeconds > UPLOAD_LIMITS.MAX_VOICE_DURATION) {
    return {
      valid: false,
      error: `Voice recording cannot exceed ${UPLOAD_LIMITS.MAX_VOICE_DURATION} seconds`,
    };
  }
  if (durationInSeconds < 1) {
    return {
      valid: false,
      error: 'Voice recording is too short',
    };
  }
  return { valid: true };
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): { valid: boolean; error?: string; strength?: 'weak' | 'medium' | 'strong' } => {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (strengthScore < 2) {
    return { valid: false, error: 'Password is too weak', strength: 'weak' };
  }

  const strength = strengthScore === 2 ? 'medium' : strengthScore >= 3 ? 'strong' : 'weak';

  return { valid: true, strength };
};

/**
 * Sanitize user input (remove dangerous characters)
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim();
};
