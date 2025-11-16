/**
 * Gamification Slice
 * Manages points, badges, and reward animations
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Badge,
  UserBadge,
  PointsAnimationState,
  BadgeNotification,
} from '@/types/gamification.types';

interface GamificationState {
  totalPoints: number;
  level: number;
  pendingPointsAnimations: PointsAnimationState[];
  pendingBadgeNotifications: BadgeNotification[];
  recentBadges: UserBadge[];
}

const initialState: GamificationState = {
  totalPoints: 0,
  level: 1,
  pendingPointsAnimations: [],
  pendingBadgeNotifications: [],
  recentBadges: [],
};

export const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    setTotalPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints = action.payload;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints += action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    queuePointsAnimation: (state, action: PayloadAction<PointsAnimationState>) => {
      state.pendingPointsAnimations.push(action.payload);
    },
    dequeuePointsAnimation: (state) => {
      state.pendingPointsAnimations.shift();
    },
    clearPointsAnimations: (state) => {
      state.pendingPointsAnimations = [];
    },
    queueBadgeNotification: (state, action: PayloadAction<BadgeNotification>) => {
      state.pendingBadgeNotifications.push(action.payload);
    },
    dequeueBadgeNotification: (state) => {
      state.pendingBadgeNotifications.shift();
    },
    clearBadgeNotifications: (state) => {
      state.pendingBadgeNotifications = [];
    },
    addRecentBadge: (state, action: PayloadAction<UserBadge>) => {
      state.recentBadges.unshift(action.payload);
      // Keep only last 5 badges
      if (state.recentBadges.length > 5) {
        state.recentBadges = state.recentBadges.slice(0, 5);
      }
    },
  },
});

export const {
  setTotalPoints,
  addPoints,
  setLevel,
  queuePointsAnimation,
  dequeuePointsAnimation,
  clearPointsAnimations,
  queueBadgeNotification,
  dequeueBadgeNotification,
  clearBadgeNotifications,
  addRecentBadge,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
