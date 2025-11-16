import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { BadgeRarity } from '@shared/types/gamification.types';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ name: 'icon_url' })
  iconUrl: string;

  @Column({
    type: 'enum',
    enum: BadgeRarity,
    default: BadgeRarity.COMMON,
  })
  rarity: BadgeRarity;

  @Column({ name: 'points_value', default: 0 })
  pointsValue: number;

  @Column('jsonb', { default: {} })
  criteria: Record<string, unknown>;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
