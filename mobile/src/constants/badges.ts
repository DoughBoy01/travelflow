/**
 * Badge System Constants
 * Re-export shared badge constants and add mobile-specific ones
 */

export * from '@shared/constants/badges.constants';

/**
 * Badge animation settings
 */
export const BADGE_ANIMATION = {
  UNLOCK_DURATION: 1500,
  SCALE_DURATION: 500,
  GLOW_DURATION: 2000,
} as const;

/**
 * Badge display settings
 */
export const BADGE_DISPLAY = {
  ICON_SIZE_SM: 32,
  ICON_SIZE_MD: 48,
  ICON_SIZE_LG: 64,
  ICON_SIZE_XL: 96,
} as const;
