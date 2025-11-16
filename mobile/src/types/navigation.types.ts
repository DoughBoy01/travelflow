/**
 * React Navigation Type Definitions
 */

import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Root Stack Navigator Params
 */
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  FeedbackFlow: {
    trigger?: string;
    context?: Record<string, unknown>;
  };
  BadgeDetail: {
    badgeId: string;
  };
  RewardDetail: {
    rewardId: string;
  };
  Settings: undefined;
  Profile: {
    userId?: string;
  };
};

/**
 * Main Tab Navigator Params
 */
export type MainTabParamList = {
  Home: undefined;
  Feedback: undefined;
  Rewards: undefined;
  Impact: undefined;
  Profile: undefined;
};

/**
 * Screen Props Helper Types
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
