import { Injectable } from '@nestjs/common';
import { PointsService } from './points.service';
import { BadgesService } from './badges.service';
import { LeaderboardService } from './leaderboard.service';

@Injectable()
export class GamificationService {
  constructor(
    private readonly pointsService: PointsService,
    private readonly badgesService: BadgesService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  async processFeedbackSubmission(userId: string, points: number, feedbackType: string) {
    // Add points
    const pointsResult = await this.pointsService.addPoints(
      userId,
      points,
      `Feedback submitted: ${feedbackType}`,
    );

    // Check for new badges
    const userStats = await this.leaderboardService.getUserStats(userId);
    const newBadges = await this.badgesService.checkAndAwardBadges(userId, {
      totalPoints: userStats.points,
      level: userStats.level,
    });

    return {
      pointsAwarded: points,
      totalPoints: pointsResult.newTotal,
      levelUp: pointsResult.levelUp,
      newLevel: pointsResult.newLevel,
      newBadges: newBadges.map(ub => ({
        id: ub.badge.id,
        code: ub.badge.code,
        name: ub.badge.name,
        description: ub.badge.description,
        iconUrl: ub.badge.iconUrl,
        rarity: ub.badge.rarity,
      })),
    };
  }

  async getUserProfile(userId: string) {
    const stats = await this.leaderboardService.getUserStats(userId);
    const badges = await this.badgesService.getUserBadges(userId);
    const points = await this.pointsService.getPoints(userId);
    const pointsForNextLevel = this.pointsService.getPointsForNextLevel(points);

    return {
      points: stats.points,
      level: stats.level,
      rank: stats.rank,
      percentile: stats.percentile,
      badgeCount: stats.badgeCount,
      badges: badges.map(ub => ({
        id: ub.badge.id,
        code: ub.badge.code,
        name: ub.badge.name,
        description: ub.badge.description,
        iconUrl: ub.badge.iconUrl,
        rarity: ub.badge.rarity,
        earnedAt: ub.earnedAt,
      })),
      progress: {
        currentLevelPoints: points,
        pointsForNextLevel,
        progressPercentage: pointsForNextLevel > 0
          ? Math.round((points / (points + pointsForNextLevel)) * 100)
          : 100,
      },
    };
  }
}
