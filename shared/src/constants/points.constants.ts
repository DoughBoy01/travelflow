/**
 * Points System Constants
 * Shared between mobile and backend
 */

export const POINTS_SYSTEM = {
  // Base points for feedback types
  EMOJI_RATING: 5,
  STAR_RATING: 10,
  QUICK_TEXT: 15,
  FREE_TEXT: 25,
  VOICE_FEEDBACK: 50,
  PHOTO_FEEDBACK: 75,
  DETAILED_REVIEW: 100,

  // Bonus points
  FIRST_FEEDBACK: 50,
  CONTEXTUAL_FEEDBACK: 10, // Responding to a trigger
  COMPLETE_PROFILE: 100,

  // Streak bonuses
  STREAK_BONUS_3: 50,
  STREAK_BONUS_7: 150,
  STREAK_BONUS_14: 300,
  STREAK_BONUS_30: 500,
  STREAK_BONUS_90: 2000,

  // Quality bonuses
  HELPFUL_VOTE: 5, // Per helpful vote from others
  VERIFIED_IMPACT: 200, // When feedback leads to verified change
  FEATURED_REVIEW: 500, // Selected as featured review

  // Multipliers
  WEEKEND_MULTIPLIER: 1.5,
  HOLIDAY_MULTIPLIER: 2.0,
} as const;

export const LEVEL_THRESHOLDS = [
  { level: 1, points: 0 },
  { level: 2, points: 100 },
  { level: 3, points: 250 },
  { level: 4, points: 500 },
  { level: 5, points: 1000 },
  { level: 6, points: 2000 },
  { level: 7, points: 4000 },
  { level: 8, points: 7000 },
  { level: 9, points: 12000 },
  { level: 10, points: 20000 },
] as const;

export function calculateLevel(totalPoints: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i].points) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
}

export function getNextLevelPoints(currentLevel: number): number | null {
  const nextLevel = LEVEL_THRESHOLDS.find((l) => l.level === currentLevel + 1);
  return nextLevel ? nextLevel.points : null;
}
