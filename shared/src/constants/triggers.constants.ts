/**
 * Feedback Trigger Configuration
 * Shared between mobile and backend
 */

import { FeedbackTrigger } from '../types/feedback.types';

export interface TriggerConfig {
  trigger: FeedbackTrigger;
  name: string;
  description: string;
  promptMessage: string;
  minDelayMinutes: number; // Min time before showing this trigger again
  maxPerDay: number; // Max times this trigger can fire per day
  priority: number; // 1-10, higher = more important
  suggestedInputModes: string[];
}

export const TRIGGER_CONFIGS: Record<FeedbackTrigger, TriggerConfig> = {
  [FeedbackTrigger.FLIGHT_LANDED]: {
    trigger: FeedbackTrigger.FLIGHT_LANDED,
    name: 'Flight Landed',
    description: 'Triggered when flight lands',
    promptMessage: 'How was your flight? Share your experience!',
    minDelayMinutes: 1440, // 24 hours
    maxPerDay: 1,
    priority: 9,
    suggestedInputModes: ['emoji', 'star', 'text'],
  },
  [FeedbackTrigger.HOTEL_CHECKIN]: {
    trigger: FeedbackTrigger.HOTEL_CHECKIN,
    name: 'Hotel Check-in',
    description: 'Triggered at hotel check-in',
    promptMessage: 'Welcome! How was your check-in experience?',
    minDelayMinutes: 30,
    maxPerDay: 1,
    priority: 7,
    suggestedInputModes: ['emoji', 'star'],
  },
  [FeedbackTrigger.HOTEL_ROOM_ENTERED]: {
    trigger: FeedbackTrigger.HOTEL_ROOM_ENTERED,
    name: 'Entered Hotel Room',
    description: 'Triggered when entering hotel room (WiFi connection)',
    promptMessage: 'First impressions of your room?',
    minDelayMinutes: 60,
    maxPerDay: 1,
    priority: 8,
    suggestedInputModes: ['emoji', 'star', 'photo'],
  },
  [FeedbackTrigger.MEAL_SERVICE_COMPLETE]: {
    trigger: FeedbackTrigger.MEAL_SERVICE_COMPLETE,
    name: 'Meal Service Complete',
    description: 'Triggered after meal service on flight',
    promptMessage: 'How was your meal?',
    minDelayMinutes: 180, // 3 hours
    maxPerDay: 3,
    priority: 6,
    suggestedInputModes: ['emoji', 'star', 'photo'],
  },
  [FeedbackTrigger.WIFI_CONNECTED]: {
    trigger: FeedbackTrigger.WIFI_CONNECTED,
    name: 'WiFi Connected',
    description: 'Triggered when connecting to airline/hotel WiFi',
    promptMessage: 'Quick question: How is the WiFi?',
    minDelayMinutes: 360, // 6 hours
    maxPerDay: 2,
    priority: 4,
    suggestedInputModes: ['emoji', 'star'],
  },
  [FeedbackTrigger.CHECKOUT_COMPLETE]: {
    trigger: FeedbackTrigger.CHECKOUT_COMPLETE,
    name: 'Checkout Complete',
    description: 'Triggered at hotel checkout',
    promptMessage: 'How was your stay overall?',
    minDelayMinutes: 1440, // 24 hours
    maxPerDay: 1,
    priority: 9,
    suggestedInputModes: ['star', 'text', 'voice'],
  },
  [FeedbackTrigger.JOURNEY_COMPLETE]: {
    trigger: FeedbackTrigger.JOURNEY_COMPLETE,
    name: 'Journey Complete',
    description: 'Triggered when entire trip is complete',
    promptMessage: 'Your trip is complete! Share your overall experience.',
    minDelayMinutes: 1440, // 24 hours
    maxPerDay: 1,
    priority: 10,
    suggestedInputModes: ['star', 'text', 'voice'],
  },
  [FeedbackTrigger.MANUAL]: {
    trigger: FeedbackTrigger.MANUAL,
    name: 'Manual',
    description: 'User-initiated feedback',
    promptMessage: 'What would you like to share?',
    minDelayMinutes: 0,
    maxPerDay: 100,
    priority: 5,
    suggestedInputModes: ['emoji', 'star', 'text', 'voice', 'photo'],
  },
};

/**
 * Quiet Hours - Don't trigger feedback during these hours (local time)
 */
export const QUIET_HOURS = {
  start: 22, // 10 PM
  end: 7, // 7 AM
};

/**
 * Throttle limits - Maximum feedback requests per period
 */
export const THROTTLE_LIMITS = {
  MAX_PER_HOUR: 2,
  MAX_PER_DAY: 5,
  MAX_PER_WEEK: 20,
};
