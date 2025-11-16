import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { AnalyticsEventType } from '@shared/types/analytics.types';

@Entity('analytics_events')
@Index(['userId', 'type'])
@Index(['createdAt'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AnalyticsEventType,
  })
  type: AnalyticsEventType;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column('jsonb', { nullable: true })
  properties: Record<string, any>;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
