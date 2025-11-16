/**
 * Jest Setup
 * Configuration and mocks for testing
 */

// Mock react-native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    TouchableOpacity: View,
  };
});

// Mock @react-native-firebase
jest.mock('@react-native-firebase/app', () => ({}));
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: () => ({
    requestPermission: jest.fn(() => Promise.resolve(1)),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
  }),
}));

// Mock react-native-voice
jest.mock('@react-native-voice/voice', () => ({
  __esModule: true,
  default: {
    isAvailable: jest.fn(() => Promise.resolve(1)),
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    destroy: jest.fn(),
    onSpeechStart: null,
    onSpeechEnd: null,
    onSpeechResults: null,
    onSpeechError: null,
  },
}));

// Mock react-native-haptic-feedback
jest.mock('react-native-haptic-feedback', () => ({
  __esModule: true,
  default: {
    trigger: jest.fn(),
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));
