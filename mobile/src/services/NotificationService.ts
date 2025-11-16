/**
 * Notification Service
 * Handles push notifications and in-app notifications
 */

import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { Notification, NotificationType } from '@/types/notification.types';

/**
 * Request notification permissions
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Get FCM token
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Subscribe to topic (for broadcast notifications)
 */
export const subscribeToTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().subscribeToTopic(topic);
  } catch (error) {
    console.error('Error subscribing to topic:', error);
  }
};

/**
 * Unsubscribe from topic
 */
export const unsubscribeFromTopic = async (topic: string): Promise<void> => {
  try {
    await messaging().unsubscribeFromTopic(topic);
  } catch (error) {
    console.error('Error unsubscribing from topic:', error);
  }
};

/**
 * Handle foreground notifications
 */
export const onForegroundMessage = (
  callback: (notification: Notification) => void
) => {
  return messaging().onMessage(async (remoteMessage) => {
    const notification: Notification = {
      id: remoteMessage.messageId || '',
      type: (remoteMessage.data?.type as NotificationType) || NotificationType.SYSTEM,
      priority: 'medium',
      title: remoteMessage.notification?.title || '',
      body: remoteMessage.notification?.body || '',
      data: remoteMessage.data,
      read: false,
      createdAt: new Date().toISOString(),
    };

    callback(notification);
  });
};

/**
 * Handle background notifications
 */
export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
    // Handle background message (e.g., update badge count, store in local DB)
  });
};

/**
 * Handle notification opened (when user taps on notification)
 */
export const onNotificationOpened = (
  callback: (notification: Notification) => void
) => {
  return messaging().onNotificationOpenedApp((remoteMessage) => {
    const notification: Notification = {
      id: remoteMessage.messageId || '',
      type: (remoteMessage.data?.type as NotificationType) || NotificationType.SYSTEM,
      priority: 'medium',
      title: remoteMessage.notification?.title || '',
      body: remoteMessage.notification?.body || '',
      data: remoteMessage.data,
      read: true,
      createdAt: new Date().toISOString(),
    };

    callback(notification);
  });
};

/**
 * Get initial notification (when app was opened from quit state)
 */
export const getInitialNotification = async (): Promise<Notification | null> => {
  const remoteMessage = await messaging().getInitialNotification();

  if (!remoteMessage) return null;

  return {
    id: remoteMessage.messageId || '',
    type: (remoteMessage.data?.type as NotificationType) || NotificationType.SYSTEM,
    priority: 'medium',
    title: remoteMessage.notification?.title || '',
    body: remoteMessage.notification?.body || '',
    data: remoteMessage.data,
    read: true,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Set badge count (iOS only)
 */
export const setBadgeCount = async (count: number): Promise<void> => {
  if (Platform.OS === 'ios') {
    try {
      await messaging().setApplicationBadge(count);
    } catch (error) {
      console.error('Error setting badge count:', error);
    }
  }
};

export const NotificationService = {
  requestNotificationPermission,
  getFCMToken,
  subscribeToTopic,
  unsubscribeFromTopic,
  onForegroundMessage,
  setBackgroundMessageHandler,
  onNotificationOpened,
  getInitialNotification,
  setBadgeCount,
};
