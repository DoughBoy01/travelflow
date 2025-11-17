/**
 * Pill Component
 * Small badge/tag UI element for categorization
 * Always capitalizes the first letter of text
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/constants/theme';

interface PillProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  style?: ViewStyle;
}

const VARIANT_COLORS = {
  primary: {
    background: COLORS.primary.light || '#E3F2FD',
    text: COLORS.primary.main,
  },
  secondary: {
    background: '#F5F5F5',
    text: COLORS.text.secondary,
  },
  success: {
    background: COLORS.success.light || '#E8F5E9',
    text: COLORS.success.main,
  },
  warning: {
    background: '#FFF3E0',
    text: '#F57C00',
  },
  info: {
    background: '#E1F5FE',
    text: '#0277BD',
  },
};

/**
 * Capitalizes the first letter of each word (title case)
 * Example: "airline meals" -> "Airline Meals"
 */
const toTitleCase = (text: string): string => {
  if (!text || text.length === 0) return text;

  return text
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const Pill: React.FC<PillProps> = ({
  text,
  variant = 'secondary',
  style,
}) => {
  const colors = VARIANT_COLORS[variant];
  const capitalizedText = toTitleCase(text);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {capitalizedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});
