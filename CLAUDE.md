# TravelFlow - AI Assistant Guide

**Last Updated:** 2025-11-16
**Version:** 1.0.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Design Principles](#design-principles)
4. [Codebase Structure](#codebase-structure)
5. [Development Workflows](#development-workflows)
6. [Key Conventions](#key-conventions)
7. [API Contracts](#api-contracts)
8. [Database Schema](#database-schema)
9. [Testing Strategy](#testing-strategy)
10. [Deployment & CI/CD](#deployment--cicd)

---

## Project Overview

**TravelFlow** is a comprehensive travel feedback platform designed to collect high-quality, actionable feedback from travelers in real-time during their journeys. The system focuses on airlines and hotels, providing a seamless, rewarding experience that maximizes engagement while respecting user privacy and minimizing friction.

### Core Objectives

- **Maximize actionable feedback** through contextual, timely prompts
- **Deliver trusted, unobtrusive experiences** with progressive disclosure
- **Reward and recognize** users through gamification
- **Support multi-modal input** (text, voice, emoji, photos, ratings)
- **Ensure privacy and transparency** in all data collection
- **Close the feedback loop** by showing impact to users

### Key Features

- ✈️ Real-time feedback collection during travel
- 🎮 Gamification with points, badges, and leaderboards
- 🗣️ Multi-modal input (text, voice, emoji, photos, star ratings)
- 🔔 Contextual notifications at key journey moments
- 🏆 Reward system with travel credits and upgrades
- 📊 Impact analytics showing user contribution
- 🔒 Privacy-first with granular controls
- ♿ Accessibility and inclusivity built-in

---

## Architecture & Technology Stack

### Technology Decisions

**Mobile Application**
- **Framework:** React Native 0.73+
- **State Management:** Redux Toolkit + RTK Query
- **Navigation:** React Navigation 6
- **UI Components:** React Native Paper + Custom Design System
- **Animations:** React Native Reanimated 3
- **Voice Input:** react-native-voice
- **Image Handling:** react-native-image-picker
- **Push Notifications:** React Native Firebase (FCM)
- **Haptics:** react-native-haptic-feedback

**Backend API**
- **Framework:** NestJS (Node.js TypeScript framework)
- **API Style:** RESTful + GraphQL (Apollo)
- **Real-time:** Socket.io for live feedback
- **Authentication:** JWT + OAuth 2.0
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI 3.0

**Database**
- **Primary DB:** PostgreSQL 15+ (user data, bookings, feedback)
- **Cache Layer:** Redis 7+ (sessions, real-time data, leaderboards)
- **File Storage:** AWS S3 (photos, voice recordings)
- **Search:** Elasticsearch (feedback search and analytics)

**Infrastructure**
- **Hosting:** AWS (ECS for containers, RDS for PostgreSQL)
- **CDN:** CloudFront
- **Monitoring:** DataDog + Sentry
- **CI/CD:** GitHub Actions
- **Container:** Docker + Docker Compose

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Feedback   │  │ Gamification │  │  Analytics   │      │
│  │    Module    │  │    Module    │  │    Module    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ REST/GraphQL/WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                    API Gateway (NestJS)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │   Feedback   │  │   Rewards    │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Notification │  │  Analytics   │  │   AI/ML      │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌──────▼─────┐  ┌──────▼─────┐
│  PostgreSQL  │  │   Redis    │  │    S3      │
│  (Primary)   │  │  (Cache)   │  │  (Files)   │
└──────────────┘  └────────────┘  └────────────┘
```

---

## Design Principles

The following principles guide all development decisions in TravelFlow. These are **non-negotiable** and should be considered in every feature implementation.

### 1. Progressive Disclosure

**Principle:** Structure feedback journeys in layers. Start simple, reveal complexity only when needed.

**Implementation Guidelines:**
- Initial prompt: Single tap/emoji/star (≤2 seconds to complete)
- Layer 2: Brief text input or quick selections (≤30 seconds)
- Layer 3: Detailed forms, photos, voice notes (opt-in only)
- Never show all options upfront
- Use smart defaults and pre-filled suggestions

**Code Convention:**
```typescript
// Good: Progressive disclosure
<FeedbackPrompt level="basic" onEngagement={showDetailedForm} />

// Bad: All options at once
<FeedbackForm showAllFields={true} />
```

### 2. Contextual & Timely Triggers

**Principle:** Collect feedback when impressions are fresh and users aren't busy.

**Implementation Guidelines:**
- Trigger points: post-meal, after check-in, room entry, flight landing
- Use geolocation, WiFi connection, calendar events as signals
- Respect "Do Not Disturb" modes and user preferences
- Maximum 1 feedback request per context per day
- Implement smart timing algorithms (avoid sleep hours, busy periods)

**Trigger Events to Monitor:**
```typescript
enum FeedbackTrigger {
  FLIGHT_LANDED = 'flight_landed',
  HOTEL_CHECKIN = 'hotel_checkin',
  HOTEL_ROOM_ENTERED = 'hotel_room_entered',
  MEAL_SERVICE_COMPLETE = 'meal_service_complete',
  WIFI_CONNECTED = 'wifi_connected',
  CHECKOUT_COMPLETE = 'checkout_complete',
  JOURNEY_COMPLETE = 'journey_complete',
}
```

### 3. Microinteractions & Positive Reinforcement

**Principle:** Provide instant, delightful feedback after every user action.

**Implementation Guidelines:**
- Animated emoji responses (scale, bounce, confetti)
- Haptic feedback on all interactions (light, medium, heavy)
- Sound effects (optional, user-controlled)
- Progress indicators for multi-step flows
- Immediate "thank you" messages with personality

**Animation Standards:**
- Duration: 200-400ms for UI responses
- Easing: Spring animations for organic feel
- Haptics: Light (tap), Medium (success), Heavy (achievement)

### 4. Multi-Modal Input Support

**Principle:** Allow feedback via text, emoji, ratings, voice, photos per user preference.

**Implementation Guidelines:**
- Default to simplest input (emoji/star rating)
- Offer voice input prominently (accessibility + convenience)
- Support photo uploads with auto-compression
- AI transcription for voice notes (Whisper API)
- AI image analysis for photo context
- Save user's preferred input method

**Supported Input Modes:**
```typescript
enum FeedbackInputMode {
  EMOJI = 'emoji',           // Single emoji selection
  STAR_RATING = 'star',      // 1-5 stars
  QUICK_TEXT = 'quick_text', // Pre-defined quick responses
  FREE_TEXT = 'text',        // Free-form text
  VOICE = 'voice',           // Voice recording
  PHOTO = 'photo',           // Photo upload
  HYBRID = 'hybrid',         // Combination
}
```

### 5. Gamification & Value Exchange

**Principle:** Make feedback intrinsically rewarding with points, badges, and tangible rewards.

**Implementation Guidelines:**
- Points for every feedback action (5-100 points based on detail)
- Achievement badges (streaks, milestones, quality)
- Tiered leaderboards (weekly, monthly, all-time)
- Tangible rewards: travel credits, upgrades, lounge access
- Show point accumulation in real-time
- Clear reward thresholds and progress bars

**Point System:**
```typescript
const POINTS_SYSTEM = {
  EMOJI_RATING: 5,
  STAR_RATING: 10,
  TEXT_FEEDBACK: 25,
  VOICE_FEEDBACK: 50,
  PHOTO_FEEDBACK: 75,
  DETAILED_REVIEW: 100,
  STREAK_BONUS_3: 50,
  STREAK_BONUS_7: 150,
  STREAK_BONUS_30: 500,
};
```

### 6. Privacy, Trust & Transparency

**Principle:** Be crystal clear about data usage. Give users complete control.

**Implementation Guidelines:**
- Explain "why" at every feedback request
- Show who will see the feedback (airline, hotel, public)
- Persistent privacy controls in settings
- Anonymity toggles per feedback item
- GDPR/CCPA compliance built-in
- Right to view, export, delete all feedback
- Display security badges (SSL, encryption, compliance)

**Privacy Controls Required:**
```typescript
interface FeedbackPrivacySettings {
  isAnonymous: boolean;          // Hide user identity
  shareWithService: boolean;     // Share with airline/hotel
  sharePublicly: boolean;        // Public reviews
  allowDataAnalytics: boolean;   // Aggregate analytics
  allowAIAnalysis: boolean;      // AI processing
  retentionPeriod: 'forever' | '1year' | '6months' | '3months';
}
```

### 7. Value and Impact for Reviewer

**Principle:** Close the loop. Show users how their feedback created change.

**Implementation Guidelines:**
- "Impact Dashboard" showing contribution metrics
- Specific change notifications ("Your feedback improved meal options!")
- Community impact stats ("You helped 1,000 travelers")
- Before/after comparisons when changes are made
- Recognition for influential feedback (top contributor badges)

**Impact Metrics to Display:**
```typescript
interface UserImpact {
  totalFeedbackCount: number;
  travelersHelped: number;
  changesInfluenced: Change[];
  topCategory: string;
  impactScore: number;
}
```

### 8. Minimal Friction & Cognitive Load

**Principle:** Minimize taps, typing, and mental effort for initial engagement.

**Implementation Guidelines:**
- Single-action principle for basic feedback (1 tap max)
- Auto-suggestions based on context
- Smart defaults (pre-fill flight/hotel info)
- Voice input to reduce typing
- Maximum 3 taps for any complete flow
- Save drafts automatically

**Friction Metrics:**
- Target: <2 seconds for emoji feedback
- Target: <10 seconds for star rating + text
- Target: <30 seconds for detailed review

### 9. Accessibility & Inclusivity

**Principle:** Ensure all mechanisms are accessible to everyone.

**Implementation Guidelines:**
- WCAG 2.1 AA compliance minimum
- Large touch targets (44x44 min)
- High contrast mode support
- Voice navigation and screen reader support
- Multi-language support (i18n)
- Simple language (avoid jargon)
- Cultural sensitivity in rewards/gamification
- Support for low-bandwidth scenarios

### 10. Real-Time Support for Issue Resolution

**Principle:** Turn feedback into conversations for problem-solving.

**Implementation Guidelines:**
- Live chat integration for critical feedback
- Auto-escalate negative feedback to support
- In-app support for immediate help
- Meta-feedback on support interactions
- SLA tracking for issue resolution
- Follow-up on resolved issues

---

## Codebase Structure

```
travelflow/
├── mobile/                          # React Native mobile app
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── feedback/            # Feedback-specific components
│   │   │   │   ├── EmojiPicker.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   ├── VoiceRecorder.tsx
│   │   │   │   ├── PhotoCapture.tsx
│   │   │   │   ├── ProgressiveFeedbackFlow.tsx
│   │   │   │   └── FeedbackTrigger.tsx
│   │   │   ├── gamification/        # Gamification components
│   │   │   │   ├── PointsAnimation.tsx
│   │   │   │   ├── BadgeDisplay.tsx
│   │   │   │   ├── Leaderboard.tsx
│   │   │   │   └── RewardProgress.tsx
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── AnimatedIcon.tsx
│   │   │   └── accessibility/       # Accessibility helpers
│   │   │       ├── AccessibleButton.tsx
│   │   │       └── ScreenReaderText.tsx
│   │   ├── screens/                 # App screens
│   │   │   ├── FeedbackScreen.tsx
│   │   │   ├── RewardsScreen.tsx
│   │   │   ├── ImpactDashboard.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── navigation/              # Navigation configuration
│   │   │   ├── AppNavigator.tsx
│   │   │   └── linking.config.ts
│   │   ├── store/                   # Redux store
│   │   │   ├── slices/
│   │   │   │   ├── feedbackSlice.ts
│   │   │   │   ├── gamificationSlice.ts
│   │   │   │   ├── userSlice.ts
│   │   │   │   └── notificationSlice.ts
│   │   │   ├── api/                 # RTK Query APIs
│   │   │   │   ├── feedbackApi.ts
│   │   │   │   ├── rewardsApi.ts
│   │   │   │   └── analyticsApi.ts
│   │   │   └── store.ts
│   │   ├── services/                # Business logic services
│   │   │   ├── FeedbackService.ts
│   │   │   ├── GamificationService.ts
│   │   │   ├── NotificationService.ts
│   │   │   ├── VoiceService.ts
│   │   │   ├── LocationService.ts
│   │   │   └── PrivacyService.ts
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useFeedbackFlow.ts
│   │   │   ├── useHaptics.ts
│   │   │   ├── useVoiceInput.ts
│   │   │   └── useContextualTrigger.ts
│   │   ├── utils/                   # Utility functions
│   │   │   ├── animations.ts
│   │   │   ├── haptics.ts
│   │   │   ├── validators.ts
│   │   │   └── i18n.ts
│   │   ├── types/                   # TypeScript types
│   │   │   ├── feedback.types.ts
│   │   │   ├── gamification.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── api.types.ts
│   │   ├── constants/               # Constants
│   │   │   ├── points.ts
│   │   │   ├── badges.ts
│   │   │   ├── triggers.ts
│   │   │   └── theme.ts
│   │   └── App.tsx
│   ├── android/                     # Android native code
│   ├── ios/                         # iOS native code
│   ├── __tests__/                   # Test files
│   └── package.json
│
├── backend/                         # NestJS backend API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── feedback/            # Feedback module
│   │   │   │   ├── feedback.controller.ts
│   │   │   │   ├── feedback.service.ts
│   │   │   │   ├── feedback.entity.ts
│   │   │   │   ├── feedback.repository.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-feedback.dto.ts
│   │   │   │   │   └── update-feedback.dto.ts
│   │   │   │   └── feedback.module.ts
│   │   │   ├── gamification/        # Gamification module
│   │   │   │   ├── gamification.controller.ts
│   │   │   │   ├── gamification.service.ts
│   │   │   │   ├── points.service.ts
│   │   │   │   ├── badges.service.ts
│   │   │   │   ├── leaderboard.service.ts
│   │   │   │   └── gamification.module.ts
│   │   │   ├── rewards/             # Rewards module
│   │   │   │   ├── rewards.controller.ts
│   │   │   │   ├── rewards.service.ts
│   │   │   │   └── rewards.module.ts
│   │   │   ├── notifications/       # Notifications module
│   │   │   │   ├── notifications.controller.ts
│   │   │   │   ├── notifications.service.ts
│   │   │   │   ├── notifications.gateway.ts (WebSocket)
│   │   │   │   └── notifications.module.ts
│   │   │   ├── analytics/           # Analytics module
│   │   │   │   ├── analytics.controller.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   │   └── analytics.module.ts
│   │   │   ├── ai/                  # AI/ML integration module
│   │   │   │   ├── ai.service.ts
│   │   │   │   ├── transcription.service.ts
│   │   │   │   ├── image-analysis.service.ts
│   │   │   │   └── ai.module.ts
│   │   │   └── users/               # User management module
│   │   │       ├── users.controller.ts
│   │   │       ├── users.service.ts
│   │   │       ├── user.entity.ts
│   │   │       └── users.module.ts
│   │   ├── common/                  # Shared resources
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── pipes/
│   │   ├── config/                  # Configuration
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── aws.config.ts
│   │   ├── database/                # Database
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   ├── main.ts                  # Application entry
│   │   └── app.module.ts
│   ├── test/                        # E2E tests
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                          # Shared code between mobile & backend
│   ├── types/
│   │   ├── feedback.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── constants/
│   │   ├── points.constants.ts
│   │   ├── badges.constants.ts
│   │   └── triggers.constants.ts
│   └── validators/
│       └── feedback.validators.ts
│
├── infrastructure/                  # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   └── Dockerfile.mobile
│   ├── docker-compose.yml
│   ├── kubernetes/                  # K8s manifests (if using)
│   └── terraform/                   # AWS infrastructure
│
├── scripts/                         # Utility scripts
│   ├── setup.sh
│   ├── seed-data.ts
│   └── migrate.ts
│
├── docs/                            # Additional documentation
│   ├── API.md                       # API documentation
│   ├── ARCHITECTURE.md              # Architecture decisions
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── CONTRIBUTING.md              # Contribution guidelines
│
├── .github/                         # GitHub configuration
│   ├── workflows/
│   │   ├── mobile-ci.yml
│   │   ├── backend-ci.yml
│   │   └── deploy.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .vscode/                         # VS Code settings
│   ├── settings.json
│   └── extensions.json
│
├── CLAUDE.md                        # This file
├── README.md                        # Project README
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── package.json                     # Root package.json (monorepo)
```

---

## Development Workflows

### Getting Started

1. **Clone and Setup**
```bash
git clone <repository-url>
cd travelflow
npm install                          # Install root dependencies
npm run setup                        # Run setup script
```

2. **Environment Configuration**
```bash
# Copy example env files
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env

# Configure with your values
# - Database credentials
# - AWS keys (S3, etc.)
# - API keys (OpenAI, Firebase, etc.)
```

3. **Database Setup**
```bash
cd backend
npm run db:migrate                   # Run migrations
npm run db:seed                      # Seed test data
```

4. **Start Development**
```bash
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Mobile (iOS)
cd mobile
npm run ios

# Terminal 3: Mobile (Android)
cd mobile
npm run android
```

### Git Workflow

**Branch Strategy:**
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

**Commit Conventions:**
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add voice input for feedback
fix: resolve haptic feedback on Android
docs: update API documentation
style: format code with prettier
refactor: optimize feedback submission flow
test: add unit tests for gamification service
chore: update dependencies
```

**Pull Request Process:**
1. Create feature branch from `develop`
2. Implement changes with tests
3. Run linters and tests locally
4. Push and create PR with description
5. Request review from team
6. Address feedback
7. Squash and merge to `develop`

### Testing Workflow

**Unit Tests:**
```bash
# Backend
cd backend
npm run test

# Mobile
cd mobile
npm run test
```

**Integration Tests:**
```bash
cd backend
npm run test:e2e
```

**Mobile E2E Tests:**
```bash
cd mobile
npm run test:e2e:ios
npm run test:e2e:android
```

**Test Coverage:**
```bash
npm run test:cov
```

Target: >80% code coverage for all modules

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] Design principles are respected
- [ ] Unit tests added/updated
- [ ] No console.log or debugging code
- [ ] Error handling implemented
- [ ] TypeScript types properly defined
- [ ] Accessibility considered
- [ ] Privacy controls respected
- [ ] Performance optimized
- [ ] Documentation updated

---

## Key Conventions

### TypeScript Conventions

**Naming:**
- PascalCase for components, classes, types, interfaces
- camelCase for variables, functions, methods
- UPPER_SNAKE_CASE for constants
- Prefix interfaces with `I` only for generic interfaces (e.g., `IRepository`)
- Suffix types with `Type` when needed for clarity

**Examples:**
```typescript
// Components
export const FeedbackButton: React.FC<Props> = () => {};

// Services
export class FeedbackService {}

// Types
export interface FeedbackData {}
export type FeedbackMode = 'emoji' | 'text' | 'voice';

// Constants
export const MAX_FEEDBACK_LENGTH = 500;

// Functions
export const calculatePoints = (feedback: FeedbackData) => {};
```

### File Naming

- **Components:** PascalCase - `FeedbackButton.tsx`
- **Services:** PascalCase - `FeedbackService.ts`
- **Utilities:** camelCase - `validateFeedback.ts`
- **Types:** kebab-case - `feedback.types.ts`
- **Tests:** Match source file - `FeedbackButton.test.tsx`

### Component Structure

```typescript
// 1. Imports (grouped)
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { FeedbackService } from '@/services';
import { Button } from '@/components/common';
import styles from './FeedbackButton.styles';

// 2. Types
interface FeedbackButtonProps {
  onSubmit: (data: FeedbackData) => void;
  disabled?: boolean;
}

// 3. Component
export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  onSubmit,
  disabled = false,
}) => {
  // 4. Hooks
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // 5. Effects
  useEffect(() => {
    // ...
  }, []);

  // 6. Handlers
  const handlePress = async () => {
    // ...
  };

  // 7. Render
  return (
    <View style={styles.container}>
      <Button onPress={handlePress} disabled={disabled || loading}>
        Submit Feedback
      </Button>
    </View>
  );
};

// 8. Styles (if inline)
const styles = StyleSheet.create({
  container: {
    // ...
  },
});
```

### Error Handling

**Backend:**
```typescript
// Use NestJS exception filters
import { HttpException, HttpStatus } from '@nestjs/common';

throw new HttpException(
  {
    status: HttpStatus.BAD_REQUEST,
    error: 'Invalid feedback data',
    details: validationErrors,
  },
  HttpStatus.BAD_REQUEST,
);
```

**Mobile:**
```typescript
// Use try-catch with user-friendly messages
try {
  await feedbackApi.submit(data);
  showSuccess('Thank you for your feedback!');
} catch (error) {
  // Log to error tracking
  Sentry.captureException(error);

  // Show user-friendly message
  showError('Could not submit feedback. Please try again.');
}
```

### API Response Format

**Success:**
```typescript
{
  "success": true,
  "data": {
    "feedbackId": "fb_123456",
    "points": 25,
    "badges": ["first_feedback"]
  },
  "meta": {
    "timestamp": "2025-11-16T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

**Error:**
```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Feedback text exceeds maximum length",
    "details": {
      "field": "text",
      "maxLength": 500,
      "actualLength": 650
    }
  },
  "meta": {
    "timestamp": "2025-11-16T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### State Management Patterns

**Redux Slice Pattern:**
```typescript
// feedbackSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackState {
  items: Feedback[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  items: [],
  loading: false,
  error: null,
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addFeedback: (state, action: PayloadAction<Feedback>) => {
      state.items.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
```

### Environment Variables

**Backend (.env):**
```
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/travelflow
REDIS_URL=redis://localhost:6379

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET_NAME=travelflow-media

# API Keys
OPENAI_API_KEY=sk-xxx
FIREBASE_SERVER_KEY=xxx

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
```

**Mobile (.env):**
```
# API
API_BASE_URL=http://localhost:3000
WS_URL=ws://localhost:3000

# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_PROJECT_ID=travelflow-xxx

# Feature Flags
ENABLE_VOICE_INPUT=true
ENABLE_PHOTO_UPLOAD=true
```

---

## API Contracts

### Feedback Endpoints

**POST /api/v1/feedback**

Submit new feedback

**Request:**
```typescript
{
  "type": "emoji" | "star" | "text" | "voice" | "photo",
  "content": {
    "emoji": "😊",           // if type=emoji
    "rating": 4,             // if type=star
    "text": "Great service", // if type=text
    "voiceUrl": "s3://...",  // if type=voice
    "photoUrl": "s3://...",  // if type=photo
  },
  "context": {
    "trigger": "meal_service_complete",
    "bookingId": "bk_123",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060
    },
    "timestamp": "2025-11-16T10:30:00Z"
  },
  "privacy": {
    "isAnonymous": false,
    "shareWithService": true,
    "sharePublicly": false
  }
}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "feedbackId": "fb_123456",
    "points": 25,
    "newBadges": ["first_feedback"],
    "totalPoints": 125,
    "nextReward": {
      "name": "Travel Credit",
      "pointsNeeded": 375
    }
  }
}
```

**GET /api/v1/feedback/:id**

Get feedback details

**GET /api/v1/feedback/user/:userId**

Get user's feedback history

**PATCH /api/v1/feedback/:id**

Update feedback (within 24 hours)

**DELETE /api/v1/feedback/:id**

Delete feedback (privacy control)

### Gamification Endpoints

**GET /api/v1/gamification/points**

Get user's point balance

**GET /api/v1/gamification/badges**

Get user's earned badges

**GET /api/v1/gamification/leaderboard**

Get leaderboard rankings

Query params: `period=weekly|monthly|alltime`

**POST /api/v1/gamification/redeem**

Redeem points for rewards

### Analytics Endpoints

**GET /api/v1/analytics/impact**

Get user's impact metrics

**Response:**
```typescript
{
  "success": true,
  "data": {
    "totalFeedback": 45,
    "travelersHelped": 1200,
    "changesInfluenced": [
      {
        "title": "Improved meal options on route NYC-LAX",
        "date": "2025-11-01",
        "yourContribution": "Your feedback was cited by 15 others"
      }
    ],
    "topCategory": "Airline Meals",
    "impactScore": 892
  }
}
```

### WebSocket Events

**Client → Server:**
- `feedback:start` - User started feedback flow
- `feedback:progress` - User progressed through layers
- `feedback:submit` - Feedback submitted
- `feedback:abandon` - User abandoned flow

**Server → Client:**
- `notification:new` - New notification
- `reward:earned` - New reward/badge earned
- `impact:update` - Impact metrics updated
- `leaderboard:update` - Leaderboard position changed

---

## Database Schema

### Core Tables

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_points ON users(total_points DESC);
```

**feedback**
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- emoji, star, text, voice, photo
  content JSONB NOT NULL,
  context JSONB NOT NULL,
  privacy_settings JSONB NOT NULL,
  points_awarded INTEGER DEFAULT 0,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'active', -- active, archived, deleted
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_feedback_user ON feedback(user_id);
CREATE INDEX idx_feedback_type ON feedback(type);
CREATE INDEX idx_feedback_created ON feedback(created_at DESC);
CREATE INDEX idx_feedback_context ON feedback USING GIN(context);
```

**badges**
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria JSONB NOT NULL,
  points_value INTEGER DEFAULT 0,
  rarity VARCHAR(50) DEFAULT 'common', -- common, rare, epic, legendary
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_badges_code ON badges(code);
```

**user_badges**
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
```

**rewards**
```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- credit, upgrade, lounge_access, etc.
  points_required INTEGER NOT NULL,
  value_usd DECIMAL(10, 2),
  availability INTEGER, -- NULL = unlimited
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**user_rewards**
```sql
CREATE TABLE user_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active', -- active, used, expired
  redemption_code VARCHAR(255)
);

CREATE INDEX idx_user_rewards_user ON user_rewards(user_id);
CREATE INDEX idx_user_rewards_status ON user_rewards(status);
```

**impact_events**
```sql
CREATE TABLE impact_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  related_feedback_ids UUID[],
  travelers_impacted INTEGER DEFAULT 0,
  occurred_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_impact_events_category ON impact_events(category);
CREATE INDEX idx_impact_events_occurred ON impact_events(occurred_at DESC);
```

### Redis Schema

**Session Storage:**
```
session:{userId} → JSON (session data)
TTL: 7 days
```

**Leaderboard:**
```
leaderboard:weekly → Sorted Set (userId, points)
leaderboard:monthly → Sorted Set (userId, points)
leaderboard:alltime → Sorted Set (userId, points)
```

**Cache:**
```
cache:user:{userId} → JSON (user data)
cache:badges:{userId} → JSON (user badges)
cache:impact:{userId} → JSON (impact metrics)
TTL: 5 minutes
```

**Real-time Feedback Queue:**
```
queue:feedback → List (pending feedback for processing)
```

---

## Testing Strategy

### Unit Tests

**Coverage Targets:**
- Services: 90%+
- Utilities: 95%+
- Components: 80%+
- Overall: 85%+

**Example Test:**
```typescript
// FeedbackService.test.ts
describe('FeedbackService', () => {
  describe('calculatePoints', () => {
    it('should award 5 points for emoji feedback', () => {
      const feedback = { type: 'emoji', content: { emoji: '😊' } };
      const points = FeedbackService.calculatePoints(feedback);
      expect(points).toBe(5);
    });

    it('should award bonus points for streak', () => {
      const user = { currentStreak: 7 };
      const points = FeedbackService.calculateStreakBonus(user);
      expect(points).toBe(150);
    });
  });
});
```

### Integration Tests

Test API endpoints with real database (test DB):

```typescript
describe('POST /api/v1/feedback', () => {
  it('should create feedback and award points', async () => {
    const response = await request(app)
      .post('/api/v1/feedback')
      .set('Authorization', `Bearer ${authToken}`)
      .send(feedbackData);

    expect(response.status).toBe(201);
    expect(response.body.data.points).toBeGreaterThan(0);
  });
});
```

### E2E Tests (Mobile)

Use Detox for React Native:

```typescript
describe('Feedback Flow', () => {
  it('should complete emoji feedback in under 2 seconds', async () => {
    await element(by.id('feedback-trigger')).tap();
    await element(by.id('emoji-happy')).tap();

    await waitFor(element(by.id('success-message')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
```

### Performance Tests

**Metrics to Monitor:**
- API response time: <200ms (p95)
- Feedback submission: <1s (p95)
- App launch time: <2s
- Frame rate: 60fps

**Tools:**
- Backend: Artillery, k6
- Mobile: React Native Performance Monitor
- Database: pg_stat_statements

---

## Deployment & CI/CD

### CI Pipeline (GitHub Actions)

**.github/workflows/backend-ci.yml**
```yaml
name: Backend CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:cov
      - uses: codecov/codecov-action@v3
```

**.github/workflows/mobile-ci.yml**
```yaml
name: Mobile CI

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run test:e2e:ios
```

### Deployment Strategy

**Environments:**
- **Development:** Auto-deploy from `develop` branch
- **Staging:** Auto-deploy from `main` after tests pass
- **Production:** Manual approval required

**Deployment Checklist:**
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Monitoring and alerts configured
- [ ] Rollback plan documented

### Monitoring

**Application Monitoring:**
- DataDog for APM and infrastructure
- Sentry for error tracking
- LogRocket for session replay (mobile)

**Alerts:**
- API error rate >5%
- API response time >500ms (p95)
- Database connection pool exhausted
- Feedback submission failures >10/min

**Key Metrics:**
- Feedback submission rate
- User engagement rate
- Points awarded per day
- Reward redemption rate
- API uptime (target: 99.9%)

---

## For AI Assistants: Key Reminders

When working on TravelFlow, always keep in mind:

1. **Design Principles First:** Every feature must align with the 10 design principles. Question any implementation that doesn't.

2. **Progressive Disclosure:** Never show complexity upfront. Layer features gradually.

3. **Privacy by Default:** Always implement privacy controls. Never collect data without clear explanation.

4. **Accessibility:** Every UI component must be accessible. Test with screen readers.

5. **Performance:** Feedback submission must feel instant. Optimize aggressively.

6. **Testing:** Write tests BEFORE implementation (TDD). Maintain >80% coverage.

7. **Type Safety:** Use TypeScript strictly. No `any` types without justification.

8. **User Value:** Every feature must deliver clear value. Ask "why does the user care?"

9. **Close the Loop:** Users must see the impact of their feedback. Build impact visibility into every flow.

10. **Mobile-First:** Design for mobile, adapt to desktop. Touch targets, gestures, offline support.

### Quick Reference Commands

```bash
# Development
npm run dev              # Start all services
npm run mobile:ios       # Run iOS app
npm run mobile:android   # Run Android app
npm run backend:dev      # Start backend only

# Testing
npm run test             # Run all tests
npm run test:watch       # Watch mode
npm run test:cov         # Coverage report

# Linting
npm run lint             # Check code
npm run lint:fix         # Auto-fix issues

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run db:reset         # Reset database

# Build
npm run build            # Build all
npm run build:mobile     # Build mobile apps
npm run build:backend    # Build backend
```

### Common Tasks

**Adding a New Feedback Type:**
1. Update `FeedbackInputMode` enum
2. Add handler in `FeedbackService`
3. Create UI component
4. Add points configuration
5. Update API endpoint
6. Write tests
7. Update documentation

**Adding a New Badge:**
1. Design badge criteria
2. Add to `badges` table seed
3. Implement award logic in `BadgesService`
4. Create badge asset (SVG)
5. Add to mobile UI
6. Write tests

**Adding a New Trigger:**
1. Define trigger in `FeedbackTrigger` enum
2. Implement detection logic
3. Configure timing/throttling
4. Add to notification service
5. Test in various scenarios
6. Document in API.md

---

**Version History:**
- v1.0.0 (2025-11-16): Initial comprehensive guide

**Maintained by:** TravelFlow Development Team

For questions or suggestions, please open an issue or submit a PR.
