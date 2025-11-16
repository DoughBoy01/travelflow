/**
 * Mobile-specific User Types
 * Extends shared user types with mobile-specific properties
 */

export * from '@shared/types/user.types';

/**
 * User preferences specific to mobile app
 */
export interface UserPreferences {
  // Notification preferences
  enablePushNotifications: boolean;
  enableEmailNotifications: boolean;
  notificationSoundEnabled: boolean;

  // Feedback preferences
  preferredInputMode: 'emoji' | 'star' | 'text' | 'voice';
  enableHapticFeedback: boolean;
  enableAutoSave: boolean;

  // Privacy preferences
  defaultPrivacySettings: {
    isAnonymous: boolean;
    shareWithService: boolean;
    sharePublicly: boolean;
  };

  // UI preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large';

  // Trigger preferences
  enableContextualTriggers: boolean;
  doNotDisturbHours?: {
    startHour: number;
    endHour: number;
  };
}

/**
 * User session data
 */
export interface UserSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  userId: string;
}

/**
 * Onboarding state
 */
export interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  completedSteps: string[];
  skippedSteps: string[];
}
