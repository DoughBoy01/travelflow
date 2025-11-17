/**
 * Haptic Feedback Utilities
 * Wrapper around react-native-haptic-feedback
 */

import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { FEATURES } from '@/constants';

/**
 * Haptic options
 */
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Light impact (for taps, selections)
 */
export const lightHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
};

/**
 * Medium impact (for confirmations, toggles)
 */
export const mediumHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
};

/**
 * Heavy impact (for major actions, errors)
 */
export const heavyHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
};

/**
 * Success feedback (for successful operations)
 */
export const successHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
};

/**
 * Warning feedback (for warnings, important info)
 */
export const warningHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('notificationWarning', hapticOptions);
};

/**
 * Error feedback (for errors, failures)
 */
export const errorHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
};

/**
 * Selection feedback (for picker changes)
 */
export const selectionHaptic = () => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger('selection', hapticOptions);
};

/**
 * Custom haptic trigger
 */
export const customHaptic = (type: HapticFeedbackTypes) => {
  if (!FEATURES.HAPTICS) return;
  ReactNativeHapticFeedback.trigger(type, hapticOptions);
};

/**
 * Haptic feedback for points earned (varies by amount)
 */
export const pointsEarnedHaptic = (points: number) => {
  if (!FEATURES.HAPTICS) return;

  if (points < 25) {
    lightHaptic();
  } else if (points < 100) {
    mediumHaptic();
  } else {
    heavyHaptic();
  }
};

/**
 * Generic trigger function with string type
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection') => {
  if (!FEATURES.HAPTICS) return;

  switch (type) {
    case 'light':
      lightHaptic();
      break;
    case 'medium':
      mediumHaptic();
      break;
    case 'heavy':
      heavyHaptic();
      break;
    case 'success':
      successHaptic();
      break;
    case 'warning':
      warningHaptic();
      break;
    case 'error':
      errorHaptic();
      break;
    case 'selection':
      selectionHaptic();
      break;
  }
};
