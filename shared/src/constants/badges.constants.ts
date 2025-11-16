/**
 * Badge System Constants
 * Shared between mobile and backend
 */

import { BadgeRarity } from '../types/gamification.types';

export interface BadgeDefinition {
  code: string;
  name: string;
  description: string;
  rarity: BadgeRarity;
  pointsValue: number;
  criteria: {
    type: string;
    value: number | string;
    [key: string]: unknown;
  };
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // First-time badges
  {
    code: 'FIRST_FEEDBACK',
    name: 'First Impression',
    description: 'Submit your first feedback',
    rarity: BadgeRarity.COMMON,
    pointsValue: 50,
    criteria: { type: 'feedback_count', value: 1 },
  },
  {
    code: 'FIRST_VOICE',
    name: 'Voice of Reason',
    description: 'Submit your first voice feedback',
    rarity: BadgeRarity.COMMON,
    pointsValue: 50,
    criteria: { type: 'voice_feedback_count', value: 1 },
  },
  {
    code: 'FIRST_PHOTO',
    name: 'Picture Perfect',
    description: 'Submit your first photo feedback',
    rarity: BadgeRarity.COMMON,
    pointsValue: 50,
    criteria: { type: 'photo_feedback_count', value: 1 },
  },

  // Streak badges
  {
    code: 'STREAK_3',
    name: 'Hat Trick',
    description: 'Maintain a 3-day feedback streak',
    rarity: BadgeRarity.COMMON,
    pointsValue: 100,
    criteria: { type: 'streak', value: 3 },
  },
  {
    code: 'STREAK_7',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day feedback streak',
    rarity: BadgeRarity.RARE,
    pointsValue: 300,
    criteria: { type: 'streak', value: 7 },
  },
  {
    code: 'STREAK_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day feedback streak',
    rarity: BadgeRarity.EPIC,
    pointsValue: 1000,
    criteria: { type: 'streak', value: 30 },
  },
  {
    code: 'STREAK_90',
    name: 'Unstoppable',
    description: 'Maintain a 90-day feedback streak',
    rarity: BadgeRarity.LEGENDARY,
    pointsValue: 5000,
    criteria: { type: 'streak', value: 90 },
  },

  // Volume badges
  {
    code: 'FEEDBACK_10',
    name: 'Frequent Flyer',
    description: 'Submit 10 pieces of feedback',
    rarity: BadgeRarity.COMMON,
    pointsValue: 100,
    criteria: { type: 'feedback_count', value: 10 },
  },
  {
    code: 'FEEDBACK_50',
    name: 'Seasoned Traveler',
    description: 'Submit 50 pieces of feedback',
    rarity: BadgeRarity.RARE,
    pointsValue: 500,
    criteria: { type: 'feedback_count', value: 50 },
  },
  {
    code: 'FEEDBACK_100',
    name: 'Travel Expert',
    description: 'Submit 100 pieces of feedback',
    rarity: BadgeRarity.EPIC,
    pointsValue: 1500,
    criteria: { type: 'feedback_count', value: 100 },
  },
  {
    code: 'FEEDBACK_500',
    name: 'Globetrotter',
    description: 'Submit 500 pieces of feedback',
    rarity: BadgeRarity.LEGENDARY,
    pointsValue: 10000,
    criteria: { type: 'feedback_count', value: 500 },
  },

  // Impact badges
  {
    code: 'FIRST_IMPACT',
    name: 'Change Maker',
    description: 'Your feedback led to a verified change',
    rarity: BadgeRarity.RARE,
    pointsValue: 500,
    criteria: { type: 'verified_impact_count', value: 1 },
  },
  {
    code: 'IMPACT_10',
    name: 'Influencer',
    description: 'Your feedback led to 10 verified changes',
    rarity: BadgeRarity.EPIC,
    pointsValue: 2000,
    criteria: { type: 'verified_impact_count', value: 10 },
  },
  {
    code: 'TRAVELERS_HELPED_1000',
    name: 'Community Hero',
    description: 'Helped 1,000 travelers with your feedback',
    rarity: BadgeRarity.EPIC,
    pointsValue: 3000,
    criteria: { type: 'travelers_helped', value: 1000 },
  },

  // Special badges
  {
    code: 'EARLY_ADOPTER',
    name: 'Early Adopter',
    description: 'Joined TravelFlow in the first month',
    rarity: BadgeRarity.RARE,
    pointsValue: 500,
    criteria: { type: 'join_date', value: '2025-12-01' }, // Example date
  },
  {
    code: 'WEEKEND_WARRIOR',
    name: 'Weekend Warrior',
    description: 'Submit feedback on 10 weekends',
    rarity: BadgeRarity.RARE,
    pointsValue: 400,
    criteria: { type: 'weekend_feedback_count', value: 10 },
  },
  {
    code: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Submit 20 pieces of feedback between 10PM-6AM',
    rarity: BadgeRarity.RARE,
    pointsValue: 300,
    criteria: { type: 'night_feedback_count', value: 20 },
  },

  // Category expert badges
  {
    code: 'MEAL_EXPERT',
    name: 'Food Critic',
    description: 'Submit 25 meal-related feedback items',
    rarity: BadgeRarity.RARE,
    pointsValue: 400,
    criteria: { type: 'category_count', value: 25, category: 'airline_meal' },
  },
  {
    code: 'HOTEL_EXPERT',
    name: 'Hotel Connoisseur',
    description: 'Submit 25 hotel-related feedback items',
    rarity: BadgeRarity.RARE,
    pointsValue: 400,
    criteria: { type: 'category_count', value: 25, category: 'hotel_room' },
  },
] as const;
