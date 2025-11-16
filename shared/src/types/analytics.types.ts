/**
 * Analytics and Impact Types
 * Shared between mobile and backend
 */

export interface Change {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  yourContribution?: string;
  feedbackCount: number;
}

export interface UserImpact {
  totalFeedback: number;
  travelersHelped: number;
  changesInfluenced: Change[];
  topCategory: string;
  impactScore: number;
  contributionsByCategory: Record<string, number>;
}

export interface CommunityImpact {
  totalFeedback: number;
  totalUsers: number;
  totalChanges: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  recentChanges: Change[];
}

export enum AnalyticsEventType {
  // Feedback Events
  FEEDBACK_STARTED = 'feedback_started',
  FEEDBACK_PROGRESSED = 'feedback_progressed',
  FEEDBACK_SUBMITTED = 'feedback_submitted',
  FEEDBACK_ABANDONED = 'feedback_abandoned',

  // Gamification Events
  POINTS_EARNED = 'points_earned',
  BADGE_EARNED = 'badge_earned',
  REWARD_REDEEMED = 'reward_redeemed',
  LEVEL_UP = 'level_up',

  // Engagement Events
  APP_OPENED = 'app_opened',
  SCREEN_VIEWED = 'screen_viewed',
  NOTIFICATION_CLICKED = 'notification_clicked',
  IMPACT_VIEWED = 'impact_viewed',

  // Errors
  ERROR_OCCURRED = 'error_occurred',
}

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  userId?: string;
  timestamp: string;
  properties?: Record<string, unknown>;
  sessionId?: string;
}
