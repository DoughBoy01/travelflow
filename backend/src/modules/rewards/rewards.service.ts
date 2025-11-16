import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { UserReward } from './entities/user-reward.entity';
import { User } from '../users/entities/user.entity';
import { RewardStatus } from '@shared/types/gamification.types';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
    @InjectRepository(UserReward)
    private readonly userRewardRepository: Repository<UserReward>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllRewards(): Promise<Reward[]> {
    return this.rewardRepository.find({
      where: { active: true },
      order: { pointsRequired: 'ASC' },
    });
  }

  async findUserRewards(userId: string): Promise<UserReward[]> {
    return this.userRewardRepository.find({
      where: { userId },
      order: { redeemedAt: 'DESC' },
      relations: ['reward'],
    });
  }

  async redeemReward(userId: string, rewardId: string): Promise<UserReward> {
    // Get user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get reward
    const reward = await this.rewardRepository.findOne({
      where: { id: rewardId, active: true },
    });
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    // Check if user has enough points
    if (user.totalPoints < reward.pointsRequired) {
      throw new BadRequestException(
        `Insufficient points. Required: ${reward.pointsRequired}, Available: ${user.totalPoints}`,
      );
    }

    // Check availability
    if (reward.availability !== null && reward.availability <= 0) {
      throw new BadRequestException('Reward is no longer available');
    }

    // Check expiry
    if (reward.expiresAt && new Date(reward.expiresAt) < new Date()) {
      throw new BadRequestException('Reward has expired');
    }

    // Deduct points from user
    user.totalPoints -= reward.pointsRequired;
    await this.userRepository.save(user);

    // Decrease availability
    if (reward.availability !== null) {
      reward.availability -= 1;
      await this.rewardRepository.save(reward);
    }

    // Create user reward
    const redemptionCode = this.generateRedemptionCode();
    const userReward = this.userRewardRepository.create({
      userId,
      rewardId,
      redemptionCode,
      expiresAt: reward.expiresAt,
    });

    return this.userRewardRepository.save(userReward);
  }

  async markRewardAsUsed(userRewardId: string, userId: string): Promise<UserReward> {
    const userReward = await this.userRewardRepository.findOne({
      where: { id: userRewardId, userId },
    });

    if (!userReward) {
      throw new NotFoundException('User reward not found');
    }

    if (userReward.status === RewardStatus.USED) {
      throw new BadRequestException('Reward has already been used');
    }

    if (userReward.status === RewardStatus.EXPIRED) {
      throw new BadRequestException('Reward has expired');
    }

    userReward.status = RewardStatus.USED;
    userReward.usedAt = new Date();

    return this.userRewardRepository.save(userReward);
  }

  private generateRedemptionCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
