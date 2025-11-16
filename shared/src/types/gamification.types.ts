/**
 * Gamification System Types
 * Shared between mobile and backend
 */

export enum BadgeRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  iconUrl: string;
  rarity: BadgeRarity;
  pointsValue: number;
  criteria: Record<string, unknown>;
  createdAt: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badge: Badge;
  earnedAt: string;
}

export enum RewardType {
  TRAVEL_CREDIT = 'travel_credit',
  SEAT_UPGRADE = 'seat_upgrade',
  LOUNGE_ACCESS = 'lounge_access',
  HOTEL_UPGRADE = 'hotel_upgrade',
  DISCOUNT = 'discount',
  VIP_STATUS = 'vip_status',
}

export enum RewardStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: RewardType;
  pointsRequired: number;
  valueUsd?: number;
  availability?: number; // null = unlimited
  expiresAt?: string;
  imageUrl?: string;
  termsUrl?: string;
  createdAt: string;
}

export interface UserReward {
  id: string;
  userId: string;
  reward: Reward;
  redemptionCode: string;
  status: RewardStatus;
  redeemedAt: string;
  usedAt?: string;
  expiresAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  points: number;
  badge?: Badge;
  isCurrentUser?: boolean;
}

export interface Leaderboard {
  period: 'weekly' | 'monthly' | 'alltime';
  entries: LeaderboardEntry[];
  currentUserRank?: number;
  totalUsers: number;
  lastUpdated: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  points: number; // positive for earning, negative for spending
  type: 'earned' | 'spent' | 'bonus' | 'penalty';
  reason: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
