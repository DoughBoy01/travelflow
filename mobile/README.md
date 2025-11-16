# TravelFlow Mobile App

React Native mobile application for TravelFlow - a comprehensive travel feedback platform.

## Prerequisites

- Node.js >= 18.0.0
- React Native development environment set up
- Xcode (for iOS development)
- Android Studio (for Android development)

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# iOS only - Install CocoaPods dependencies
cd ios && pod install && cd ..
```

### Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
# - API_BASE_URL: Backend API URL
# - FIREBASE_*: Firebase configuration
# - Feature flags
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── feedback/       # Feedback-specific components
│   ├── gamification/   # Gamification components
│   ├── common/         # Shared components
│   └── accessibility/  # Accessibility helpers
├── screens/            # App screens
├── navigation/         # Navigation configuration
├── store/              # Redux store
│   ├── slices/        # Redux slices
│   └── api/           # RTK Query APIs
├── services/           # Business logic services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript types
├── constants/          # Constants and configuration
└── App.tsx            # Main app component
```

## Key Features

- **Progressive Feedback Flow**: Multi-step feedback collection with progressive disclosure
- **Multi-Modal Input**: Emoji, star ratings, text, voice, and photo feedback
- **Gamification**: Points, badges, leaderboards, and rewards
- **Real-time Updates**: WebSocket integration for live notifications
- **Offline Support**: Redux Persist for offline functionality
- **Accessibility**: WCAG 2.1 AA compliant components
- **Haptic Feedback**: Enhanced UX with haptic feedback
- **Voice Input**: Voice recognition for hands-free feedback

## Development

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov

# Run E2E tests (iOS)
npm run test:e2e:ios

# Run E2E tests (Android)
npm run test:e2e:android
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck
```

### Building

```bash
# Clean build artifacts
npm run clean

# Build for production (handled by Xcode/Android Studio)
```

## Architecture

### State Management
- **Redux Toolkit**: Global state management
- **RTK Query**: API data fetching and caching
- **Redux Persist**: Offline persistence

### Navigation
- **React Navigation 6**: Native-like navigation
- **Stack Navigator**: Screen hierarchy
- **Tab Navigator**: Bottom tab navigation

### Styling
- **StyleSheet**: React Native styling
- **Theme System**: Centralized design tokens
- **Responsive**: Adaptive layouts

## Key Libraries

- `react-native`: 0.73.0
- `@reduxjs/toolkit`: State management
- `@react-navigation/native`: Navigation
- `react-native-reanimated`: Animations
- `react-native-firebase`: Push notifications
- `react-native-voice`: Voice recognition
- `react-native-haptic-feedback`: Haptic feedback

## API Integration

The app connects to the TravelFlow backend API. Key endpoints:

- `/api/v1/feedback`: Feedback submission and retrieval
- `/api/v1/gamification`: Points, badges, rewards
- `/api/v1/analytics`: Impact metrics
- WebSocket: Real-time notifications

## Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development workflow and guidelines.

## License

Proprietary - TravelFlow
