/**
 * Card Component
 * Container with shadow and border radius
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'md',
}) => {
  return (
    <View style={[styles.card, SHADOWS[elevation], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.paper,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
});
