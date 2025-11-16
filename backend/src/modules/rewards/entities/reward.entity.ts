import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { RewardType } from '@shared/types/gamification.types';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: RewardType,
  })
  type: RewardType;

  @Column({ name: 'points_required' })
  pointsRequired: number;

  @Column({ name: 'value_usd', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valueUsd: number;

  @Column({ nullable: true })
  availability: number;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'terms_url', nullable: true })
  termsUrl: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
