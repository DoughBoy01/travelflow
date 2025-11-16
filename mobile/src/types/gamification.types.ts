/**
 * Mobile-specific Gamification Types
 * Extends shared gamification types with mobile-specific properties
 */

import {
  Badge,
  UserBadge,
  Reward,
  UserReward,
  Leaderboard,
  PointTransaction,
} from '@shared/types/gamification.types';

export * from '@shared/types/gamification.types';

/**
 * Animation state for points/rewards
 */
export interface PointsAnimationState {
  isAnimating: boolean;
  pointsEarned: number;
  animationType: 'bounce' | 'confetti' | 'sparkle';
  duration: number;
}

/**
 * Badge notification for mobile
 */
export interface BadgeNotification {
  badge: Badge;
  isNew: boolean;
  showAnimation: boolean;
  timestamp: string;
}

/**
 * Progress towards next reward
 */
export interface RewardProgress {
  reward: Reward;
  currentPoints: number;
  pointsNeeded: number;
  percentComplete: number;
  estimatedDays?: number;
}

/**
 * Gamification UI state
 */
export interface GamificationUIState {
  showPointsAnimation: boolean;
  showBadgeUnlock: boolean;
  showLevelUp: boolean;
  pendingAnimations: PointsAnimationState[];
}
