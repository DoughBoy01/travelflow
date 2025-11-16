import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsEventType } from '@shared/types/analytics.types';
import { Feedback } from '../feedback/entities/feedback.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsEventRepository: Repository<AnalyticsEvent>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async trackEvent(userId: string | null, trackEventDto: TrackEventDto): Promise<AnalyticsEvent> {
    const event = this.analyticsEventRepository.create({
      userId,
      ...trackEventDto,
    });
    return this.analyticsEventRepository.save(event);
  }

  async getUserImpact(userId: string): Promise<{
    totalFeedback: number;
    travelersHelped: number;
    changesInfluenced: any[];
    topCategory: string;
    impactScore: number;
    contributionsByCategory: Record<string, number>;
  }> {
    const feedbacks = await this.feedbackRepository.find({
      where: { userId },
    });

    const contributionsByCategory: Record<string, number> = {};

    feedbacks.forEach(feedback => {
      if (feedback.context.category) {
        contributionsByCategory[feedback.context.category] =
          (contributionsByCategory[feedback.context.category] || 0) + 1;
      }
    });

    const topCategory = Object.entries(contributionsByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'general';

    // Mock travelers helped (in real app, would track actual impact)
    const travelersHelped = feedbacks.length * 5;

    // Mock impact score
    const impactScore = feedbacks.reduce((sum, f) => sum + f.pointsAwarded, 0);

    return {
      totalFeedback: feedbacks.length,
      travelersHelped,
      changesInfluenced: [],
      topCategory,
      impactScore,
      contributionsByCategory,
    };
  }

  async getCommunityImpact(): Promise<{
    totalFeedback: number;
    totalUsers: number;
    totalChanges: number;
    topCategories: Array<{ category: string; count: number }>;
    recentChanges: any[];
  }> {
    const totalFeedback = await this.feedbackRepository.count();

    // Get unique user count
    const result = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .select('COUNT(DISTINCT feedback.userId)', 'count')
      .getRawOne();

    const totalUsers = parseInt(result.count);

    // Get top categories
    const categoryResults = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .select("feedback.context->>'category'", 'category')
      .addSelect('COUNT(*)', 'count')
      .where("feedback.context->>'category' IS NOT NULL")
      .groupBy("feedback.context->>'category'")
      .orderBy('COUNT(*)', 'DESC')
      .limit(5)
      .getRawMany();

    const topCategories = categoryResults.map(r => ({
      category: r.category,
      count: parseInt(r.count),
    }));

    return {
      totalFeedback,
      totalUsers,
      totalChanges: 0, // Mock value
      topCategories,
      recentChanges: [],
    };
  }

  async getEventStats(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    totalEvents: number;
    eventsByType: Record<string, number>;
    dailyStats: Array<{ date: string; count: number }>;
  }> {
    const query = this.analyticsEventRepository.createQueryBuilder('event');

    if (userId) {
      query.where('event.userId = :userId', { userId });
    }

    if (startDate && endDate) {
      query.andWhere('event.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const events = await query.getMany();

    const eventsByType: Record<string, number> = {};
    events.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    });

    return {
      totalEvents: events.length,
      eventsByType,
      dailyStats: [],
    };
  }
}
