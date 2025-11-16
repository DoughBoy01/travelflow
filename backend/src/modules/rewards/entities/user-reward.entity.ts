import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Reward } from './reward.entity';
import { RewardStatus } from '@shared/types/gamification.types';

@Entity('user_rewards')
export class UserReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'reward_id' })
  rewardId: string;

  @ManyToOne(() => Reward, { eager: true })
  @JoinColumn({ name: 'reward_id' })
  reward: Reward;

  @Column({ name: 'redemption_code' })
  redemptionCode: string;

  @Column({
    type: 'enum',
    enum: RewardStatus,
    default: RewardStatus.ACTIVE,
  })
  status: RewardStatus;

  @CreateDateColumn({ name: 'redeemed_at' })
  redeemedAt: Date;

  @Column({ name: 'used_at', type: 'timestamp', nullable: true })
  usedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt: Date;
}
