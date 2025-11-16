/**
 * Gamification Service
 * Handles points, badges, rewards, and leaderboards
 */

import axios from 'axios';
import { API_CONFIG } from '@/constants';
import {
  Badge,
  UserBadge,
  Reward,
  UserReward,
  Leaderboard,
  PointTransaction,
} from '@/types/gamification.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Get user's point balance
 */
export const getPointBalance = async (token: string): Promise<number> => {
  const response = await api.get('/api/v1/gamification/points', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.points;
};

/**
 * Get user's point transaction history
 */
export const getPointHistory = async (
  token: string,
  page: number = 1,
  limit: number = 20
): Promise<{ items: PointTransaction[]; total: number }> => {
  const response = await api.get('/api/v1/gamification/points/history', {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get user's earned badges
 */
export const getUserBadges = async (token: string): Promise<UserBadge[]> => {
  const response = await api.get('/api/v1/gamification/badges', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get all available badges
 */
export const getAllBadges = async (token: string): Promise<Badge[]> => {
  const response = await api.get('/api/v1/gamification/badges/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get leaderboard
 */
export const getLeaderboard = async (
  period: 'weekly' | 'monthly' | 'alltime',
  token: string
): Promise<Leaderboard> => {
  const response = await api.get('/api/v1/gamification/leaderboard', {
    params: { period },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get available rewards
 */
export const getAvailableRewards = async (token: string): Promise<Reward[]> => {
  const response = await api.get('/api/v1/gamification/rewards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get user's redeemed rewards
 */
export const getUserRewards = async (token: string): Promise<UserReward[]> => {
  const response = await api.get('/api/v1/gamification/rewards/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Redeem a reward
 */
export const redeemReward = async (
  rewardId: string,
  token: string
): Promise<UserReward> => {
  const response = await api.post(
    '/api/v1/gamification/redeem',
    { rewardId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const GamificationService = {
  getPointBalance,
  getPointHistory,
  getUserBadges,
  getAllBadges,
  getLeaderboard,
  getAvailableRewards,
  getUserRewards,
  redeemReward,
};
