/**
 * Animation Utilities
 * Helper functions for React Native Reanimated animations
 */

import {
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { ANIMATION } from '@/constants';

/**
 * Spring animation with default config
 */
export const springAnimation = (
  toValue: number,
  config?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  }
) => {
  return withSpring(toValue, {
    damping: config?.damping || 10,
    stiffness: config?.stiffness || 100,
    mass: config?.mass || 1,
  });
};

/**
 * Timing animation with default config
 */
export const timingAnimation = (
  toValue: number,
  duration: number = ANIMATION.duration.normal
) => {
  return withTiming(toValue, {
    duration,
    easing: Easing.inOut(Easing.ease),
  });
};

/**
 * Bounce animation sequence
 */
export const bounceAnimation = (initialValue: number = 1) => {
  return withSequence(
    withTiming(1.2, { duration: 150 }),
    withSpring(initialValue, { damping: 8 })
  );
};

/**
 * Pulse animation (scale up and down)
 */
export const pulseAnimation = (scale: number = 1.1) => {
  return withSequence(
    withTiming(scale, { duration: ANIMATION.duration.fast }),
    withTiming(1, { duration: ANIMATION.duration.fast })
  );
};

/**
 * Shake animation (for errors)
 */
export const shakeAnimation = () => {
  return withSequence(
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

/**
 * Fade in animation
 */
export const fadeInAnimation = (duration: number = ANIMATION.duration.normal) => {
  return withTiming(1, {
    duration,
    easing: Easing.inOut(Easing.ease),
  });
};

/**
 * Fade out animation
 */
export const fadeOutAnimation = (duration: number = ANIMATION.duration.normal) => {
  return withTiming(0, {
    duration,
    easing: Easing.inOut(Easing.ease),
  });
};

/**
 * Slide in from bottom animation
 */
export const slideInFromBottom = (distance: number = 100) => {
  return withSpring(0, {
    damping: 15,
    stiffness: 100,
  });
};

/**
 * Confetti animation helper
 */
export const confettiAnimation = () => {
  return {
    scale: withSequence(
      withTiming(1.5, { duration: 200 }),
      withSpring(1, { damping: 10 })
    ),
    rotate: withSequence(
      withTiming(Math.PI / 4, { duration: 300 }),
      withTiming(0, { duration: 300 })
    ),
  };
};
