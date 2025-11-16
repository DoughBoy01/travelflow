/**
 * Mobile-specific Feedback Types
 * Extends shared feedback types with mobile-specific properties
 */

import {
  FeedbackData,
  FeedbackInputMode,
  FeedbackTrigger,
  FeedbackContext,
  FeedbackPrivacySettings,
} from '@shared/types/feedback.types';

export * from '@shared/types/feedback.types';

/**
 * Mobile-specific feedback flow state
 */
export interface FeedbackFlowState {
  currentStep: number;
  totalSteps: number;
  inputMode: FeedbackInputMode;
  isSubmitting: boolean;
  errors: Record<string, string>;
  draftData?: Partial<FeedbackData>;
}

/**
 * UI state for feedback components
 */
export interface FeedbackUIState {
  isEmojiPickerVisible: boolean;
  isVoiceRecording: boolean;
  isPhotoPickerVisible: boolean;
  recordingDuration: number;
  selectedEmoji?: string;
  selectedRating?: number;
}

/**
 * Local feedback draft (before submission)
 */
export interface FeedbackDraft extends Partial<FeedbackData> {
  localId: string;
  savedAt: string;
  expiresAt: string;
}

/**
 * Contextual trigger configuration for mobile
 */
export interface TriggerConfig {
  trigger: FeedbackTrigger;
  enabled: boolean;
  promptDelay: number; // milliseconds
  cooldownPeriod: number; // milliseconds
  geofenceRadius?: number; // meters
  requiresWifi?: boolean;
  timeRestrictions?: {
    startHour: number; // 0-23
    endHour: number; // 0-23
  };
}
