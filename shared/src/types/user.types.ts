/**
 * User System Types
 * Shared between mobile and backend
 */

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  totalPoints: number;
  level: number;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showInLeaderboard: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReader: boolean;
  };
}

export interface UserStats {
  totalFeedback: number;
  feedbackByType: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
  badgesEarned: number;
  rewardsRedeemed: number;
  impactScore: number;
}
