# TravelFlow API Documentation

**Version:** 1.0.0
**Base URL:** `http://localhost:3000/api/v1`
**Documentation:** `http://localhost:3000/api/docs` (Swagger)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Feedback Endpoints](#feedback-endpoints)
3. [Gamification Endpoints](#gamification-endpoints)
4. [Rewards Endpoints](#rewards-endpoints)
5. [User Endpoints](#user-endpoints)
6. [Analytics Endpoints](#analytics-endpoints)
7. [Notifications](#notifications)
8. [WebSocket Events](#websocket-events)
9. [Error Handling](#error-handling)

---

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Register

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "totalPoints": 0,
      "level": 1
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": "7d"
  },
  "meta": {
    "timestamp": "2025-11-16T10:00:00Z",
    "requestId": "req_123456"
  }
}
```

### Login

**POST** `/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK` (same structure as register)

### Refresh Token

**POST** `/auth/refresh`

Get a new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "your-refresh-token"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-token",
    "expiresIn": "7d"
  },
  "meta": { ... }
}
```

---

## Feedback Endpoints

### Submit Feedback

**POST** `/feedback`

Submit new feedback.

**Request Body:**
```json
{
  "type": "emoji",
  "content": {
    "emoji": "😊",
    "sentiment": "positive"
  },
  "context": {
    "trigger": "meal_service_complete",
    "bookingId": "bk_123",
    "flightNumber": "AA123",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060
    },
    "timestamp": "2025-11-16T10:30:00Z",
    "category": "airline_meal"
  },
  "privacy": {
    "isAnonymous": false,
    "shareWithService": true,
    "sharePublicly": false,
    "allowDataAnalytics": true,
    "allowAIAnalysis": true,
    "retentionPeriod": "1year"
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "feedbackId": "fb_123456",
    "points": 5,
    "newBadges": ["FIRST_FEEDBACK"],
    "totalPoints": 55,
    "nextReward": {
      "name": "$10 Travel Credit",
      "pointsNeeded": 445
    }
  },
  "meta": { ... }
}
```

### Get All Feedback

**GET** `/feedback?status=active`

Get all feedback (paginated).

**Query Parameters:**
- `status` (optional): Filter by status (active, archived, deleted)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

### Get My Feedback

**GET** `/feedback/my`

Get current user's feedback.

### Get Feedback Stats

**GET** `/feedback/stats`

Get user's feedback statistics.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "total": 45,
    "byType": {
      "emoji": 20,
      "star": 15,
      "text": 10
    },
    "byCategory": {
      "airline_meal": 15,
      "hotel_room": 10
    },
    "pointsEarned": 1250
  },
  "meta": { ... }
}
```

### Get Specific Feedback

**GET** `/feedback/:id`

Get feedback by ID.

### Update Feedback

**PATCH** `/feedback/:id`

Update feedback (within 24 hours of submission).

### Delete Feedback

**DELETE** `/feedback/:id`

Soft delete feedback (privacy control).

---

## Gamification Endpoints

### Get User Profile

**GET** `/gamification/profile`

Get complete gamification profile.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "totalPoints": 1250,
      "level": 5,
      "nextLevelPoints": 2000
    },
    "badges": [
      {
        "code": "FIRST_FEEDBACK",
        "name": "First Impression",
        "earnedAt": "2025-11-01T10:00:00Z"
      }
    ],
    "leaderboardRank": 42,
    "impactScore": 892
  },
  "meta": { ... }
}
```

### Get Points

**GET** `/gamification/points`

Get user points and level information.

### Get All Badges

**GET** `/gamification/badges`

Get all available badges.

### Get My Badges

**GET** `/gamification/badges/my`

Get badges earned by current user.

### Get Leaderboard

**GET** `/gamification/leaderboard?period=weekly`

Get leaderboard rankings.

**Query Parameters:**
- `period`: weekly, monthly, or alltime (default: weekly)
- `limit`: Number of entries (default: 100)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "period": "weekly",
    "entries": [
      {
        "rank": 1,
        "userId": "uuid",
        "name": "Jane Smith",
        "points": 500,
        "isCurrentUser": false
      }
    ],
    "currentUserRank": 42,
    "totalUsers": 1000,
    "lastUpdated": "2025-11-16T10:00:00Z"
  },
  "meta": { ... }
}
```

### Get User Stats

**GET** `/gamification/stats`

Get detailed user statistics.

---

## Rewards Endpoints

### Get All Rewards

**GET** `/rewards`

Get all available rewards.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "$10 Travel Credit",
      "description": "Apply $10 credit to your next booking",
      "type": "travel_credit",
      "pointsRequired": 500,
      "valueUsd": 10.0,
      "availability": null,
      "imageUrl": "/rewards/travel-credit-10.png"
    }
  ],
  "meta": { ... }
}
```

### Get My Rewards

**GET** `/rewards/my`

Get user's redeemed rewards.

### Redeem Reward

**POST** `/rewards/redeem`

Redeem a reward with points.

**Request Body:**
```json
{
  "rewardId": "uuid"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "userRewardId": "uuid",
    "redemptionCode": "TF-ABC123-XYZ",
    "reward": {
      "name": "$10 Travel Credit",
      "type": "travel_credit"
    },
    "pointsSpent": 500,
    "remainingPoints": 750,
    "expiresAt": "2026-11-16T10:00:00Z"
  },
  "meta": { ... }
}
```

### Mark Reward as Used

**PATCH** `/rewards/:id/use`

Mark a redeemed reward as used.

---

## User Endpoints

### Get My Profile

**GET** `/users/me`

Get current user profile.

### Update My Profile

**PATCH** `/users/me`

Update current user profile.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### Delete My Account

**DELETE** `/users/me`

Delete current user account.

---

## Analytics Endpoints

### Track Event

**POST** `/analytics/track`

Track an analytics event.

**Request Body:**
```json
{
  "type": "feedback_started",
  "properties": {
    "trigger": "meal_service_complete",
    "location": "flight"
  },
  "sessionId": "session_123"
}
```

### Get User Impact

**GET** `/analytics/impact/user`

Get user's impact metrics.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalFeedback": 45,
    "travelersHelped": 1200,
    "changesInfluenced": [
      {
        "id": "uuid",
        "title": "Improved meal options on NYC-LAX",
        "date": "2025-11-01",
        "yourContribution": "Your feedback was cited by 15 others",
        "category": "airline_meal"
      }
    ],
    "topCategory": "airline_meal",
    "impactScore": 892
  },
  "meta": { ... }
}
```

### Get Community Impact

**GET** `/analytics/impact/community`

Get overall community impact statistics.

### Get Event Statistics

**GET** `/analytics/events/stats?type=feedback_submitted&startDate=2025-11-01&endDate=2025-11-16`

Get analytics event statistics.

---

## Notifications

### Get All Notifications

**GET** `/notifications?isRead=false`

Get notifications (optionally filtered by read status).

### Get Unread Notifications

**GET** `/notifications/unread`

Get only unread notifications.

### Get Unread Count

**GET** `/notifications/unread/count`

Get count of unread notifications.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "count": 5
  },
  "meta": { ... }
}
```

### Mark Notification as Read

**POST** `/notifications/:id/read`

Mark a specific notification as read.

### Mark All as Read

**POST** `/notifications/read-all`

Mark all notifications as read.

---

## WebSocket Events

### Connection

Connect to WebSocket at: `ws://localhost:3000/notifications`

**Client → Server Events:**

**`register`** - Register user for notifications
```json
{
  "userId": "uuid",
  "token": "jwt-token"
}
```

**Server → Client Events:**

**`notification`** - New notification received
```json
{
  "id": "uuid",
  "type": "points_earned",
  "title": "Points Earned!",
  "message": "You earned 25 points for your feedback",
  "createdAt": "2025-11-16T10:00:00Z"
}
```

**`unreadCount`** - Unread notification count updated
```json
{
  "count": 6
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Feedback text exceeds maximum length",
    "details": {
      "field": "content.text",
      "maxLength": 500,
      "actualLength": 650
    }
  },
  "meta": {
    "timestamp": "2025-11-16T10:00:00Z",
    "requestId": "req_123456"
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - Missing or invalid authentication token
- `FORBIDDEN` - User doesn't have permission
- `NOT_FOUND` - Resource not found
- `INVALID_INPUT` - Validation error
- `CONFLICT` - Resource already exists
- `INSUFFICIENT_POINTS` - Not enough points for redemption
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Rate Limiting

API endpoints are rate limited:
- **Default:** 100 requests per minute per user
- **Authentication:** 10 requests per minute per IP

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1700000000
```

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sortBy` - Field to sort by
- `sortOrder` - `asc` or `desc` (default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "meta": { ... }
}
```

---

## Examples

See the [Swagger documentation](http://localhost:3000/api/docs) for interactive examples and detailed request/response schemas.

For code examples, check the mobile app source code at `/mobile/src/services/`.

---

**Last Updated:** 2025-11-16
**Version:** 1.0.0
