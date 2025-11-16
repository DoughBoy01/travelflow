/**
 * Rewards/Gamification RTK Query API
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants';
import {
  Badge,
  UserBadge,
  Reward,
  UserReward,
  Leaderboard,
  PointTransaction,
} from '@/types/gamification.types';
import type { RootState } from '../store';

export const rewardsApi = createApi({
  reducerPath: 'rewardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_CONFIG.BASE_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.session?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Points', 'Badges', 'Rewards', 'Leaderboard'],
  endpoints: (builder) => ({
    getPointBalance: builder.query<number, void>({
      query: () => '/gamification/points',
      transformResponse: (response: { data: { points: number } }) => response.data.points,
      providesTags: ['Points'],
    }),
    getPointHistory: builder.query<
      { items: PointTransaction[]; total: number },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/gamification/points/history',
        params: { page, limit },
      }),
      providesTags: ['Points'],
    }),
    getUserBadges: builder.query<UserBadge[], void>({
      query: () => '/gamification/badges',
      transformResponse: (response: { data: UserBadge[] }) => response.data,
      providesTags: ['Badges'],
    }),
    getAllBadges: builder.query<Badge[], void>({
      query: () => '/gamification/badges/all',
      transformResponse: (response: { data: Badge[] }) => response.data,
      providesTags: ['Badges'],
    }),
    getLeaderboard: builder.query<Leaderboard, 'weekly' | 'monthly' | 'alltime'>({
      query: (period) => ({
        url: '/gamification/leaderboard',
        params: { period },
      }),
      transformResponse: (response: { data: Leaderboard }) => response.data,
      providesTags: ['Leaderboard'],
    }),
    getAvailableRewards: builder.query<Reward[], void>({
      query: () => '/gamification/rewards',
      transformResponse: (response: { data: Reward[] }) => response.data,
      providesTags: ['Rewards'],
    }),
    getUserRewards: builder.query<UserReward[], void>({
      query: () => '/gamification/rewards/user',
      transformResponse: (response: { data: UserReward[] }) => response.data,
      providesTags: ['Rewards'],
    }),
    redeemReward: builder.mutation<UserReward, string>({
      query: (rewardId) => ({
        url: '/gamification/redeem',
        method: 'POST',
        body: { rewardId },
      }),
      invalidatesTags: ['Points', 'Rewards'],
    }),
  }),
});

export const {
  useGetPointBalanceQuery,
  useGetPointHistoryQuery,
  useGetUserBadgesQuery,
  useGetAllBadgesQuery,
  useGetLeaderboardQuery,
  useGetAvailableRewardsQuery,
  useGetUserRewardsQuery,
  useRedeemRewardMutation,
} = rewardsApi;
