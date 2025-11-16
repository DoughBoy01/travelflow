/**
 * Points Animation Component
 * Animated display for points earned
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface PointsAnimationProps {
  points: number;
  onComplete?: () => void;
}

export const PointsAnimation: React.FC<PointsAnimationProps> = ({
  points,
  onComplete,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate in
    scale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );
    opacity.value = withTiming(1, { duration: 300 });

    // Animate out after 2 seconds
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        onComplete?.();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.points}>+{points}</Text>
      <Text style={styles.label}>points</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  points: {
    fontSize: 48,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.main,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});
