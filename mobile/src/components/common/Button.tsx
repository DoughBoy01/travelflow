/**
 * Button Component
 * Reusable button with accessibility features
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, LAYOUT } from '@/constants/theme';
import { useHaptics } from '@/hooks';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const { triggerMedium } = useHaptics();

  const handlePress = () => {
    if (!disabled && !loading) {
      triggerMedium();
      onPress();
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: COLORS.primary.main };
      case 'secondary':
        return { ...baseStyle, backgroundColor: COLORS.secondary.main };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.primary.main,
        };
      case 'text':
        return { ...baseStyle, backgroundColor: 'transparent' };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    switch (variant) {
      case 'outline':
      case 'text':
        return { ...baseStyle, color: COLORS.primary.main };
      default:
        return { ...baseStyle, color: COLORS.primary.contrast };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabled, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'text' ? COLORS.primary.main : COLORS.primary.contrast} />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  smallButton: {
    height: 36,
    paddingHorizontal: SPACING.md,
  },
  mediumButton: {
    height: LAYOUT.buttonHeight,
    paddingHorizontal: SPACING.lg,
  },
  largeButton: {
    height: 56,
    paddingHorizontal: SPACING.xl,
  },
  text: {
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  smallText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  largeText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});
