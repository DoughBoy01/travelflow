/**
 * Theme Constants
 * Design system colors, typography, spacing, etc.
 */

export const COLORS = {
  // Primary colors
  primary: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    contrast: '#FFFFFF',
  },

  // Secondary colors
  secondary: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
    contrast: '#FFFFFF',
  },

  // Success/Error/Warning/Info
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },

  // Neutrals
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#121212',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },

  // Sentiment colors for feedback
  sentiment: {
    positive: '#4CAF50',
    neutral: '#FF9800',
    negative: '#F44336',
  },

  // Badge rarity colors
  badge: {
    common: '#9E9E9E',
    rare: '#2196F3',
    epic: '#9C27B0',
    legendary: '#FF9800',
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    spring: 'spring',
  },
} as const;

export const LAYOUT = {
  screenPadding: SPACING.md,
  headerHeight: 56,
  tabBarHeight: 60,
  buttonHeight: 48,
  inputHeight: 48,
  touchTargetSize: 44, // Minimum touch target (accessibility)
} as const;
