/**
 * TravelFlow Mobile App
 * Main application component
 */

import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Redux store
import { store, persistor } from './store/store';

// Navigation
import { AppNavigator } from './navigation/AppNavigator';

// Services
import { NotificationService } from './services';

// Constants
import { COLORS } from './constants/theme';

/**
 * Main App Component
 */
const App: React.FC = () => {
  useEffect(() => {
    // Initialize notification listeners
    setupNotifications();

    return () => {
      // Cleanup
    };
  }, []);

  const setupNotifications = async () => {
    // Request notification permission
    const hasPermission = await NotificationService.requestNotificationPermission();

    if (hasPermission) {
      // Get FCM token
      const token = await NotificationService.getFCMToken();
      console.log('FCM Token:', token);

      // Setup foreground notification handler
      NotificationService.onForegroundMessage((notification) => {
        console.log('Foreground notification:', notification);
        // Dispatch to Redux store or show in-app notification
      });

      // Setup notification opened handler
      NotificationService.onNotificationOpened((notification) => {
        console.log('Notification opened:', notification);
        // Navigate to appropriate screen
      });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={COLORS.background.default}
            />
            <AppNavigator />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
  },
});

export default App;
