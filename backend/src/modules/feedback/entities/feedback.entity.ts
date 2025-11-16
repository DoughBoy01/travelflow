import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FeedbackInputMode, FeedbackTrigger, FeedbackStatus, FeedbackCategory } from '@shared/types/feedback.types';
import { User } from '../../users/entities/user.entity';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: FeedbackInputMode,
  })
  type: FeedbackInputMode;

  @Column('jsonb')
  content: Record<string, any>;

  @Column('jsonb')
  context: {
    trigger: FeedbackTrigger;
    bookingId?: string;
    flightNumber?: string;
    hotelId?: string;
    location?: {
      lat: number;
      lng: number;
      accuracy?: number;
    };
    timestamp: string;
    category?: FeedbackCategory;
    metadata?: Record<string, unknown>;
  };

  @Column('jsonb')
  privacy: {
    isAnonymous: boolean;
    shareWithService: boolean;
    sharePublicly: boolean;
    allowDataAnalytics: boolean;
    allowAIAnalysis: boolean;
    retentionPeriod: string;
  };

  @Column({ name: 'points_awarded', default: 0 })
  pointsAwarded: number;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.ACTIVE,
  })
  status: FeedbackStatus;

  @Column({ name: 'ai_sentiment', nullable: true })
  aiSentiment: string;

  @Column('simple-array', { name: 'ai_tags', nullable: true })
  aiTags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
