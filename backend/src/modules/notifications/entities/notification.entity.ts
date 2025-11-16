import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
  FEEDBACK_REMINDER = 'feedback_reminder',
  POINTS_EARNED = 'points_earned',
  BADGE_EARNED = 'badge_earned',
  LEVEL_UP = 'level_up',
  REWARD_AVAILABLE = 'reward_available',
  GENERAL = 'general',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column('jsonb', { nullable: true })
  data: Record<string, any>;

  @Column({ default: false })
  read: boolean;

  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
