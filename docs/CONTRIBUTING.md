# Contributing to TravelFlow

Thank you for your interest in contributing to TravelFlow! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Docker and Docker Compose
- For mobile development:
  - iOS: macOS with Xcode 14+
  - Android: Android Studio and JDK 11+

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/travelflow.git
cd travelflow
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/DoughBoy01/travelflow.git
```

### Install Dependencies

```bash
npm run setup
```

### Start Development Environment

```bash
# Start Docker services
npm run docker:up

# Run database migrations
npm run db:migrate

# Seed test data
npm run db:seed

# Start development servers
npm run dev
```

---

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/your-feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Production hotfixes

### Creating a Feature Branch

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### Keeping Your Branch Updated

```bash
git checkout develop
git pull upstream develop
git checkout feature/your-feature-name
git rebase develop
```

---

## Coding Standards

### General Principles

1. **Follow the Design Principles** outlined in [CLAUDE.md](../CLAUDE.md)
2. **Write self-documenting code** with clear variable and function names
3. **Keep functions small** - ideally under 50 lines
4. **Use TypeScript strictly** - no `any` types without justification
5. **Write tests** for all new code

### TypeScript

**Naming Conventions:**
```typescript
// PascalCase for components, classes, types, interfaces
class FeedbackService {}
interface UserProfile {}
type FeedbackMode = 'emoji' | 'text';

// camelCase for variables, functions
const userName = 'John';
function calculatePoints() {}

// UPPER_SNAKE_CASE for constants
const MAX_FEEDBACK_LENGTH = 500;
```

**Type Safety:**
```typescript
// Good: Explicit types
function submitFeedback(data: FeedbackData): Promise<ApiResponse> {
  // ...
}

// Bad: Implicit any
function submitFeedback(data) {
  // ...
}
```

### React/React Native

**Component Structure:**
```typescript
// 1. Imports
import React, { useState } from 'react';

// 2. Types
interface Props {
  onSubmit: (data: string) => void;
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ onSubmit }) => {
  // 4. State
  const [value, setValue] = useState('');

  // 5. Handlers
  const handleSubmit = () => {
    onSubmit(value);
  };

  // 6. Render
  return <View>...</View>;
};
```

**Hooks Rules:**
- Use functional components with hooks
- Custom hooks should start with `use`
- Follow [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)

### Backend (NestJS)

**Module Structure:**
- One feature per module
- Controllers handle HTTP/WebSocket
- Services contain business logic
- Entities define database schema
- DTOs validate input/output

**Example:**
```typescript
// Service with proper dependency injection
@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private gamificationService: GamificationService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    // Business logic
  }
}
```

### File Organization

- Group by feature, not by type
- Keep related files together
- Use barrel exports (`index.ts`)

**Example:**
```
modules/feedback/
├── feedback.module.ts
├── feedback.controller.ts
├── feedback.service.ts
├── entities/
│   └── feedback.entity.ts
├── dto/
│   ├── create-feedback.dto.ts
│   └── update-feedback.dto.ts
└── index.ts
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring (no feature/bug changes)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(feedback): add voice input support

Implemented voice recording and transcription for feedback submission.
Uses Whisper API for accurate transcription.

Closes #123

---

fix(gamification): correct points calculation for streak bonuses

The streak bonus was not being applied correctly for 7-day streaks.
Fixed the calculation logic in GamificationService.

Fixes #456

---

docs(api): update authentication endpoints documentation

Added examples for refresh token endpoint and error responses.
```

### Commit Best Practices

- **Atomic commits**: Each commit should represent one logical change
- **Clear messages**: Explain what and why, not how
- **Test before committing**: Ensure tests pass
- **No WIP commits**: Squash before creating PR

---

## Pull Request Process

### Before Creating a PR

1. **Update your branch** with latest `develop`
2. **Run tests**: `npm run test`
3. **Run linters**: `npm run lint:fix`
4. **Build successfully**: `npm run build`
5. **Update documentation** if needed

### Creating a PR

1. Push your branch to your fork
2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. Select your branch
5. Fill out the PR template

### PR Title Format

Follow commit message conventions:
```
feat(feedback): add voice input support
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console.log or debugging code
- [ ] Tests pass locally
- [ ] Linter passes

## Screenshots (if applicable)

## Related Issues
Closes #123
```

### Review Process

1. **Automated checks** must pass (CI, linting, tests)
2. **Code review** by at least one maintainer
3. **Address feedback** and push updates
4. **Approval** from maintainer
5. **Squash and merge** to `develop`

---

## Testing

### Running Tests

```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# Specific suite
npm run test:backend
npm run test:mobile
```

### Writing Tests

**Unit Tests:**
```typescript
describe('FeedbackService', () => {
  describe('calculatePoints', () => {
    it('should award 5 points for emoji feedback', () => {
      const points = service.calculatePoints({ type: 'emoji' });
      expect(points).toBe(5);
    });
  });
});
```

**Integration Tests:**
```typescript
describe('POST /feedback', () => {
  it('should create feedback and award points', async () => {
    const response = await request(app)
      .post('/api/v1/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send(feedbackData);

    expect(response.status).toBe(201);
    expect(response.body.data.points).toBeGreaterThan(0);
  });
});
```

### Test Coverage

- **Target**: >80% coverage
- **Required**: All new features must have tests
- **Critical paths**: 100% coverage for core flows

---

## Documentation

### Code Documentation

**JSDoc for complex functions:**
```typescript
/**
 * Calculates points awarded for feedback submission
 * Considers feedback type, user streak, and time of day
 *
 * @param feedback - The feedback data
 * @param user - The user submitting feedback
 * @returns Points to be awarded
 */
function calculatePoints(feedback: FeedbackData, user: User): number {
  // Implementation
}
```

### API Documentation

- Update `docs/API.md` for API changes
- Add Swagger decorators for new endpoints
- Include request/response examples

### README Updates

Update project README when:
- Adding new features
- Changing setup process
- Modifying dependencies
- Updating architecture

---

## Questions?

- **GitHub Issues**: [Create an issue](https://github.com/DoughBoy01/travelflow/issues)
- **Email**: support@travelflow.com
- **Discord**: [Join our community](https://discord.gg/travelflow)

---

Thank you for contributing to TravelFlow! 🚀
