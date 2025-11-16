/**
 * User Slice
 * Manages user authentication and profile
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSession, UserPreferences } from '@/types/user.types';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  totalPoints: number;
  level: number;
  createdAt: string;
}

interface UserState {
  currentUser: User | null;
  session: UserSession | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

const defaultPreferences: UserPreferences = {
  enablePushNotifications: true,
  enableEmailNotifications: true,
  notificationSoundEnabled: true,
  preferredInputMode: 'emoji',
  enableHapticFeedback: true,
  enableAutoSave: true,
  defaultPrivacySettings: {
    isAnonymous: false,
    shareWithService: true,
    sharePublicly: false,
  },
  theme: 'auto',
  language: 'en',
  fontSize: 'medium',
  enableContextualTriggers: true,
};

const initialState: UserState = {
  currentUser: null,
  session: null,
  preferences: defaultPreferences,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    setSession: (state, action: PayloadAction<UserSession>) => {
      state.session = action.payload;
      state.isAuthenticated = true;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    logout: (state) => {
      state.currentUser = null;
      state.session = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setUser,
  setSession,
  updateUserProfile,
  setPreferences,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
