import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from './entities/badge.entity';
import { UserBadge } from './entities/user-badge.entity';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(UserBadge)
    private readonly userBadgeRepository: Repository<UserBadge>,
  ) {}

  async getAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.find({
      where: { active: true },
      order: { pointsValue: 'ASC' },
    });
  }

  async getUserBadges(userId: string): Promise<UserBadge[]> {
    return this.userBadgeRepository.find({
      where: { userId },
      order: { earnedAt: 'DESC' },
      relations: ['badge'],
    });
  }

  async awardBadge(userId: string, badgeCode: string): Promise<UserBadge | null> {
    const badge = await this.badgeRepository.findOne({
      where: { code: badgeCode, active: true },
    });

    if (!badge) {
      return null;
    }

    // Check if user already has this badge
    const existing = await this.userBadgeRepository.findOne({
      where: { userId, badgeId: badge.id },
    });

    if (existing) {
      return existing;
    }

    const userBadge = this.userBadgeRepository.create({
      userId,
      badgeId: badge.id,
    });

    return this.userBadgeRepository.save(userBadge);
  }

  async checkAndAwardBadges(userId: string, context: {
    feedbackCount?: number;
    totalPoints?: number;
    level?: number;
    voiceFeedbackCount?: number;
    photoFeedbackCount?: number;
  }): Promise<UserBadge[]> {
    const newBadges: UserBadge[] = [];

    // Define badge criteria
    const badgeCriteria = [
      { code: 'first_feedback', condition: () => context.feedbackCount === 1 },
      { code: 'feedback_10', condition: () => context.feedbackCount === 10 },
      { code: 'feedback_50', condition: () => context.feedbackCount === 50 },
      { code: 'feedback_100', condition: () => context.feedbackCount === 100 },
      { code: 'level_5', condition: () => context.level === 5 },
      { code: 'level_10', condition: () => context.level === 10 },
      { code: 'voice_master', condition: () => (context.voiceFeedbackCount || 0) >= 20 },
      { code: 'photo_master', condition: () => (context.photoFeedbackCount || 0) >= 20 },
      { code: 'points_1000', condition: () => (context.totalPoints || 0) >= 1000 },
      { code: 'points_5000', condition: () => (context.totalPoints || 0) >= 5000 },
    ];

    for (const criteria of badgeCriteria) {
      if (criteria.condition()) {
        const badge = await this.awardBadge(userId, criteria.code);
        if (badge) {
          newBadges.push(badge);
        }
      }
    }

    return newBadges;
  }

  async seedBadges(): Promise<void> {
    const badges = [
      {
        code: 'first_feedback',
        name: 'First Steps',
        description: 'Submit your first feedback',
        iconUrl: '/badges/first_feedback.png',
        rarity: 'common' as const,
        pointsValue: 10,
        criteria: { feedbackCount: 1 },
      },
      {
        code: 'feedback_10',
        name: 'Feedback Enthusiast',
        description: 'Submit 10 feedbacks',
        iconUrl: '/badges/feedback_10.png',
        rarity: 'common' as const,
        pointsValue: 50,
        criteria: { feedbackCount: 10 },
      },
      {
        code: 'feedback_50',
        name: 'Feedback Expert',
        description: 'Submit 50 feedbacks',
        iconUrl: '/badges/feedback_50.png',
        rarity: 'rare' as const,
        pointsValue: 200,
        criteria: { feedbackCount: 50 },
      },
      {
        code: 'feedback_100',
        name: 'Feedback Master',
        description: 'Submit 100 feedbacks',
        iconUrl: '/badges/feedback_100.png',
        rarity: 'epic' as const,
        pointsValue: 500,
        criteria: { feedbackCount: 100 },
      },
      {
        code: 'voice_master',
        name: 'Voice Champion',
        description: 'Submit 20 voice feedbacks',
        iconUrl: '/badges/voice_master.png',
        rarity: 'rare' as const,
        pointsValue: 300,
        criteria: { voiceFeedbackCount: 20 },
      },
      {
        code: 'photo_master',
        name: 'Photo Pro',
        description: 'Submit 20 photo feedbacks',
        iconUrl: '/badges/photo_master.png',
        rarity: 'rare' as const,
        pointsValue: 300,
        criteria: { photoFeedbackCount: 20 },
      },
      {
        code: 'level_5',
        name: 'Rising Star',
        description: 'Reach Level 5',
        iconUrl: '/badges/level_5.png',
        rarity: 'rare' as const,
        pointsValue: 250,
        criteria: { level: 5 },
      },
      {
        code: 'level_10',
        name: 'Legend',
        description: 'Reach Level 10',
        iconUrl: '/badges/level_10.png',
        rarity: 'legendary' as const,
        pointsValue: 1000,
        criteria: { level: 10 },
      },
      {
        code: 'points_1000',
        name: 'Point Collector',
        description: 'Earn 1000 total points',
        iconUrl: '/badges/points_1000.png',
        rarity: 'rare' as const,
        pointsValue: 100,
        criteria: { totalPoints: 1000 },
      },
      {
        code: 'points_5000',
        name: 'Point Master',
        description: 'Earn 5000 total points',
        iconUrl: '/badges/points_5000.png',
        rarity: 'epic' as const,
        pointsValue: 500,
        criteria: { totalPoints: 5000 },
      },
    ];

    for (const badgeData of badges) {
      const existing = await this.badgeRepository.findOne({
        where: { code: badgeData.code },
      });

      if (!existing) {
        const badge = this.badgeRepository.create(badgeData);
        await this.badgeRepository.save(badge);
      }
    }
  }
}
