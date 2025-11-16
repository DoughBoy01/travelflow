import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserBadge } from './entities/user-badge.entity';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  points: number;
  level: number;
  badgeCount: number;
  isCurrentUser?: boolean;
}

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserBadge)
    private readonly userBadgeRepository: Repository<UserBadge>,
  ) {}

  async getLeaderboard(
    period: 'weekly' | 'monthly' | 'alltime' = 'alltime',
    limit: number = 100,
    currentUserId?: string,
  ): Promise<{
    entries: LeaderboardEntry[];
    currentUserRank?: number;
    totalUsers: number;
  }> {
    // For now, we'll implement alltime leaderboard
    // Weekly and monthly would require tracking points by date
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.avatarUrl',
        'user.totalPoints',
        'user.level',
      ])
      .orderBy('user.totalPoints', 'DESC')
      .take(limit)
      .getMany();

    const entries: LeaderboardEntry[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const badgeCount = await this.userBadgeRepository.count({
        where: { userId: user.id },
      });

      entries.push({
        rank: i + 1,
        userId: user.id,
        name: user.name || 'Anonymous User',
        avatarUrl: user.avatarUrl || undefined,
        points: user.totalPoints,
        level: user.level,
        badgeCount,
        isCurrentUser: currentUserId ? user.id === currentUserId : false,
      });
    }

    // Get current user rank if not in top results
    let currentUserRank: number | undefined;
    if (currentUserId && !entries.find(e => e.userId === currentUserId)) {
      currentUserRank = await this.getUserRank(currentUserId);
    }

    const totalUsers = await this.userRepository.count();

    return {
      entries,
      currentUserRank,
      totalUsers,
    };
  }

  async getUserRank(userId: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return -1;
    }

    const higherRankedCount = await this.userRepository
      .createQueryBuilder('user')
      .where('user.totalPoints > :points', { points: user.totalPoints })
      .getCount();

    return higherRankedCount + 1;
  }

  async getUserStats(userId: string): Promise<{
    points: number;
    level: number;
    rank: number;
    badgeCount: number;
    percentile: number;
  }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const rank = await this.getUserRank(userId);
    const totalUsers = await this.userRepository.count();
    const badgeCount = await this.userBadgeRepository.count({
      where: { userId },
    });

    const percentile = ((totalUsers - rank) / totalUsers) * 100;

    return {
      points: user.totalPoints,
      level: user.level,
      rank,
      badgeCount,
      percentile: Math.round(percentile),
    };
  }
}
