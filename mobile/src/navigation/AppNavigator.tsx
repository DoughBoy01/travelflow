/**
 * App Navigator
 * Main navigation structure using React Navigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '@/types/navigation.types';

// Screens
import { FeedbackScreen } from '@/screens/FeedbackScreen';
import { RewardsScreen } from '@/screens/RewardsScreen';
import { ImpactDashboard } from '@/screens/ImpactDashboard';
import { ProfileScreen } from '@/screens/ProfileScreen';

// Placeholder screens (to be implemented)
const HomeScreen: React.FC = () => null;
const SettingsScreen: React.FC = () => null;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main Tab Navigator
 */
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => null, // Add icon here
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          tabBarLabel: 'Feedback',
          tabBarIcon: () => null, // Add icon here
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: () => null, // Add icon here
        }}
      />
      <Tab.Screen
        name="Impact"
        component={ImpactDashboard}
        options={{
          tabBarLabel: 'Impact',
          tabBarIcon: () => null, // Add icon here
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => null, // Add icon here
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 */
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
