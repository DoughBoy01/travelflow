/**
 * useAnimation Hook
 * Convenient hook for React Native Reanimated animations
 */

import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useCallback } from 'react';
import {
  springAnimation,
  timingAnimation,
  bounceAnimation,
  pulseAnimation,
  shakeAnimation,
  fadeInAnimation,
  fadeOutAnimation,
} from '@/utils/animations';

export const useAnimation = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  /**
   * Animated style for common transformations
   */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}rad` },
    ],
    opacity: opacity.value,
  }));

  /**
   * Bounce animation
   */
  const bounce = useCallback(() => {
    scale.value = bounceAnimation();
  }, [scale]);

  /**
   * Pulse animation
   */
  const pulse = useCallback((scaleTo: number = 1.1) => {
    scale.value = pulseAnimation(scaleTo);
  }, [scale]);

  /**
   * Shake animation
   */
  const shake = useCallback(() => {
    translateX.value = shakeAnimation();
  }, [translateX]);

  /**
   * Fade in animation
   */
  const fadeIn = useCallback((duration?: number) => {
    opacity.value = fadeInAnimation(duration);
  }, [opacity]);

  /**
   * Fade out animation
   */
  const fadeOut = useCallback((duration?: number) => {
    opacity.value = fadeOutAnimation(duration);
  }, [opacity]);

  /**
   * Spring to value
   */
  const springTo = useCallback((value: number, target: 'scale' | 'opacity' | 'translateX' | 'translateY') => {
    switch (target) {
      case 'scale':
        scale.value = springAnimation(value);
        break;
      case 'opacity':
        opacity.value = springAnimation(value);
        break;
      case 'translateX':
        translateX.value = springAnimation(value);
        break;
      case 'translateY':
        translateY.value = springAnimation(value);
        break;
    }
  }, [scale, opacity, translateX, translateY]);

  /**
   * Reset all animations
   */
  const reset = useCallback(() => {
    scale.value = timingAnimation(1);
    opacity.value = timingAnimation(1);
    translateX.value = timingAnimation(0);
    translateY.value = timingAnimation(0);
    rotate.value = timingAnimation(0);
  }, [scale, opacity, translateX, translateY, rotate]);

  return {
    animatedStyle,
    values: {
      scale,
      opacity,
      translateX,
      translateY,
      rotate,
    },
    bounce,
    pulse,
    shake,
    fadeIn,
    fadeOut,
    springTo,
    reset,
  };
};
