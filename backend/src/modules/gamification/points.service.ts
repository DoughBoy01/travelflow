import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addPoints(
    userId: string,
    points: number,
    reason: string,
  ): Promise<{ newTotal: number; levelUp: boolean; newLevel?: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const oldLevel = user.level;
    user.totalPoints += points;
    user.level = this.calculateLevel(user.totalPoints);

    await this.userRepository.save(user);

    return {
      newTotal: user.totalPoints,
      levelUp: user.level > oldLevel,
      newLevel: user.level > oldLevel ? user.level : undefined,
    };
  }

  async getPoints(userId: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.totalPoints || 0;
  }

  async getLevel(userId: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.level || 1;
  }

  calculateLevel(totalPoints: number): number {
    const levels = [
      { level: 1, points: 0 },
      { level: 2, points: 100 },
      { level: 3, points: 250 },
      { level: 4, points: 500 },
      { level: 5, points: 1000 },
      { level: 6, points: 2000 },
      { level: 7, points: 4000 },
      { level: 8, points: 7000 },
      { level: 9, points: 12000 },
      { level: 10, points: 20000 },
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalPoints >= levels[i].points) {
        return levels[i].level;
      }
    }
    return 1;
  }

  getPointsForNextLevel(currentPoints: number): number {
    const levels = [100, 250, 500, 1000, 2000, 4000, 7000, 12000, 20000, 35000];

    for (const threshold of levels) {
      if (currentPoints < threshold) {
        return threshold - currentPoints;
      }
    }

    return 0; // Max level reached
  }
}
