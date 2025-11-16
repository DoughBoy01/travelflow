/**
 * Points System Constants
 * Re-export shared points constants and add mobile-specific ones
 */

export * from '@shared/constants/points.constants';

/**
 * Animation durations for point rewards (in milliseconds)
 */
export const POINTS_ANIMATION = {
  DURATION: 1000,
  BOUNCE_DURATION: 300,
  CONFETTI_DURATION: 2000,
  DELAY_BETWEEN_ANIMATIONS: 500,
} as const;

/**
 * Points thresholds for visual effects
 */
export const POINTS_EFFECTS = {
  SMALL_REWARD: 25, // Simple animation
  MEDIUM_REWARD: 100, // Bounce + haptic
  LARGE_REWARD: 500, // Confetti + sound
} as const;
