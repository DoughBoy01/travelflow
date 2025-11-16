# TravelFlow

> A comprehensive travel feedback platform for airlines and hotels

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB)](https://reactnative.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E)](https://nestjs.com/)

## Overview

TravelFlow is a mobile-first platform designed to collect high-quality, actionable feedback from travelers in real-time during their journeys. Built with a focus on user experience, privacy, and gamification, TravelFlow makes giving feedback rewarding and effortless.

### Key Features

- ✈️ **Real-time Feedback Collection** - Contextual prompts at key journey moments
- 🎮 **Gamification** - Points, badges, and leaderboards
- 🗣️ **Multi-modal Input** - Text, voice, emoji, photos, star ratings
- 🔔 **Smart Notifications** - Timely, contextual feedback requests
- 🏆 **Reward System** - Travel credits, upgrades, and VIP access
- 📊 **Impact Analytics** - See how your feedback creates change
- 🔒 **Privacy-First** - Granular controls and transparency
- ♿ **Accessible** - Built for everyone

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- iOS: Xcode 14+ and CocoaPods
- Android: Android Studio and JDK 11+

### Installation

```bash
# Clone the repository
git clone https://github.com/DoughBoy01/travelflow.git
cd travelflow

# Install dependencies
npm run setup

# Start Docker services (PostgreSQL, Redis)
npm run docker:up

# Run database migrations and seed data
npm run db:migrate
npm run db:seed
```

### Development

```bash
# Start all services (backend + mobile)
npm run dev

# Or run individually:
npm run backend:dev    # Start backend API
npm run mobile:ios     # Run iOS app
npm run mobile:android # Run Android app
```

The backend API will be available at `http://localhost:3000`

### Environment Variables

Copy the example environment files and configure:

```bash
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
```

See [Backend Configuration](backend/README.md#configuration) and [Mobile Configuration](mobile/README.md#configuration) for details.

## Architecture

TravelFlow uses a modern, scalable architecture:

- **Mobile:** React Native with TypeScript
- **Backend:** NestJS (Node.js) with TypeScript
- **Database:** PostgreSQL + Redis
- **Storage:** AWS S3
- **Real-time:** Socket.io
- **Infrastructure:** Docker, AWS

See [CLAUDE.md](CLAUDE.md) for comprehensive architecture documentation.

## Project Structure

```
travelflow/
├── mobile/          # React Native mobile app
├── backend/         # NestJS backend API
├── shared/          # Shared TypeScript code
├── infrastructure/  # Docker and IaC
├── scripts/         # Utility scripts
└── docs/           # Additional documentation
```

## Design Principles

TravelFlow is built on 10 core design principles:

1. **Progressive Disclosure** - Start simple, reveal complexity gradually
2. **Contextual Triggers** - Feedback at the right time and place
3. **Microinteractions** - Delightful, instant feedback
4. **Multi-modal Input** - Multiple ways to provide feedback
5. **Gamification** - Make feedback rewarding
6. **Privacy & Trust** - Transparent data usage
7. **User Impact** - Show how feedback creates change
8. **Minimal Friction** - Effortless engagement
9. **Accessibility** - Built for everyone
10. **Real-time Support** - Turn feedback into conversations

See [CLAUDE.md](CLAUDE.md#design-principles) for detailed implementation guidelines.

## Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch

# Backend tests only
npm run test:backend

# Mobile tests only
npm run test:mobile
```

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment instructions.

## Documentation

- [CLAUDE.md](CLAUDE.md) - Comprehensive guide for AI assistants and developers
- [API Documentation](docs/API.md) - API endpoints and contracts
- [Architecture](docs/ARCHITECTURE.md) - System architecture and decisions
- [Contributing](docs/CONTRIBUTING.md) - Contribution guidelines

## Scripts

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

# Docker
npm run docker:up        # Start services
npm run docker:down      # Stop services
npm run docker:logs      # View logs

# Build
npm run build            # Build all
npm run clean            # Clean all
```

## Tech Stack

### Mobile App
- React Native 0.73
- TypeScript 5.3
- Redux Toolkit
- React Navigation
- React Native Paper
- Socket.io Client

### Backend API
- NestJS 10
- TypeScript 5.3
- PostgreSQL 15
- Redis 7
- Socket.io
- JWT Authentication

### Infrastructure
- Docker & Docker Compose
- AWS (ECS, RDS, S3)
- GitHub Actions (CI/CD)
- DataDog (Monitoring)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@travelflow.com
- 💬 Discord: [Join our community](https://discord.gg/travelflow)
- 🐛 Issues: [GitHub Issues](https://github.com/DoughBoy01/travelflow/issues)
- 📖 Docs: [Full Documentation](https://docs.travelflow.com)

## Acknowledgments

Built with ❤️ by the TravelFlow team.

Special thanks to all contributors and the open-source community.

---

**Made with TypeScript, React Native, and NestJS**
