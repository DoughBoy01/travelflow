/**
 * Notification Types for Mobile
 */

/**
 * Notification types
 */
export enum NotificationType {
  FEEDBACK_REQUEST = 'feedback_request',
  POINTS_EARNED = 'points_earned',
  BADGE_UNLOCKED = 'badge_unlocked',
  REWARD_AVAILABLE = 'reward_available',
  IMPACT_UPDATE = 'impact_update',
  LEADERBOARD_UPDATE = 'leaderboard_update',
  REMINDER = 'reminder',
  SYSTEM = 'system',
}

/**
 * Notification priority
 */
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Base notification interface
 */
export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  read: boolean;
  actionUrl?: string;
  imageUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

/**
 * Push notification payload
 */
export interface PushNotificationPayload {
  notification: {
    title: string;
    body: string;
    sound?: string;
    badge?: number;
  };
  data: Record<string, unknown>;
}

/**
 * Local notification (scheduled)
 */
export interface LocalNotification {
  id: string;
  title: string;
  body: string;
  scheduledTime: string;
  repeat?: 'daily' | 'weekly' | 'monthly';
  data?: Record<string, unknown>;
}
