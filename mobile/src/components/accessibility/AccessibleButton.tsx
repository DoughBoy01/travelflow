/**
 * Accessible Button Component
 * Enhanced button with full accessibility support
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, AccessibilityRole } from 'react-native';
import { LAYOUT } from '@/constants/theme';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  disabled?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: LAYOUT.touchTargetSize,
    minWidth: LAYOUT.touchTargetSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
