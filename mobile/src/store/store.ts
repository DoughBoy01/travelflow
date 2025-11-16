/**
 * Redux Store Configuration
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API slices
import { feedbackApi } from './api/feedbackApi';
import { rewardsApi } from './api/rewardsApi';
import { analyticsApi } from './api/analyticsApi';

// Regular slices
import feedbackReducer from './slices/feedbackSlice';
import gamificationReducer from './slices/gamificationSlice';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';

/**
 * Persist configuration
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'feedback', 'gamification'], // Only persist these slices
  blacklist: ['notification'], // Don't persist notifications
};

/**
 * Root reducer
 */
const rootReducer = combineReducers({
  // API reducers
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [rewardsApi.reducerPath]: rewardsApi.reducer,
  [analyticsApi.reducerPath]: analyticsApi.reducer,

  // Regular reducers
  feedback: feedbackReducer,
  gamification: gamificationReducer,
  user: userReducer,
  notification: notificationReducer,
});

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      feedbackApi.middleware,
      rewardsApi.middleware,
      analyticsApi.middleware
    ),
});

/**
 * Setup listeners for refetchOnFocus/refetchOnReconnect
 */
setupListeners(store.dispatch);

/**
 * Persistor
 */
export const persistor = persistStore(store);

/**
 * Type exports
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
