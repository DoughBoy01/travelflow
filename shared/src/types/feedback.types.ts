/**
 * Feedback System Types
 * Shared between mobile and backend
 */

export enum FeedbackInputMode {
  EMOJI = 'emoji',
  STAR_RATING = 'star',
  QUICK_TEXT = 'quick_text',
  FREE_TEXT = 'text',
  VOICE = 'voice',
  PHOTO = 'photo',
  HYBRID = 'hybrid',
}

export enum FeedbackTrigger {
  FLIGHT_LANDED = 'flight_landed',
  HOTEL_CHECKIN = 'hotel_checkin',
  HOTEL_ROOM_ENTERED = 'hotel_room_entered',
  MEAL_SERVICE_COMPLETE = 'meal_service_complete',
  WIFI_CONNECTED = 'wifi_connected',
  CHECKOUT_COMPLETE = 'checkout_complete',
  JOURNEY_COMPLETE = 'journey_complete',
  MANUAL = 'manual',
}

export enum FeedbackStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum FeedbackCategory {
  AIRLINE_MEAL = 'airline_meal',
  AIRLINE_SEAT = 'airline_seat',
  AIRLINE_SERVICE = 'airline_service',
  AIRLINE_ENTERTAINMENT = 'airline_entertainment',
  HOTEL_ROOM = 'hotel_room',
  HOTEL_SERVICE = 'hotel_service',
  HOTEL_AMENITIES = 'hotel_amenities',
  HOTEL_LOCATION = 'hotel_location',
  GENERAL = 'general',
}

export interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface FeedbackContext {
  trigger: FeedbackTrigger;
  bookingId?: string;
  flightNumber?: string;
  hotelId?: string;
  location?: Location;
  timestamp: string;
  category?: FeedbackCategory;
  metadata?: Record<string, unknown>;
}

export interface EmojiContent {
  emoji: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface StarRatingContent {
  rating: number; // 1-5
  category?: string;
}

export interface TextContent {
  text: string;
  language?: string;
}

export interface VoiceContent {
  audioUrl: string;
  duration: number; // seconds
  transcription?: string;
  language?: string;
}

export interface PhotoContent {
  photoUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  aiAnalysis?: {
    tags: string[];
    description: string;
    sentiment?: string;
  };
}

export type FeedbackContent =
  | EmojiContent
  | StarRatingContent
  | TextContent
  | VoiceContent
  | PhotoContent
  | Record<string, unknown>;

export interface FeedbackPrivacySettings {
  isAnonymous: boolean;
  shareWithService: boolean; // Share with airline/hotel
  sharePublicly: boolean; // Public reviews
  allowDataAnalytics: boolean; // Aggregate analytics
  allowAIAnalysis: boolean; // AI processing
  retentionPeriod: 'forever' | '1year' | '6months' | '3months';
}

export interface FeedbackData {
  id?: string;
  userId?: string;
  type: FeedbackInputMode;
  content: FeedbackContent;
  context: FeedbackContext;
  privacy: FeedbackPrivacySettings;
  pointsAwarded?: number;
  status?: FeedbackStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackSubmissionResponse {
  feedbackId: string;
  points: number;
  newBadges: string[];
  totalPoints: number;
  nextReward?: {
    name: string;
    pointsNeeded: number;
  };
}
