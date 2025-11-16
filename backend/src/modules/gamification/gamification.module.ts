import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { PointsService } from './points.service';
import { BadgesService } from './badges.service';
import { LeaderboardService } from './leaderboard.service';
import { Badge } from './entities/badge.entity';
import { UserBadge } from './entities/user-badge.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge, UserBadge, User])],
  controllers: [GamificationController],
  providers: [
    GamificationService,
    PointsService,
    BadgesService,
    LeaderboardService,
  ],
  exports: [GamificationService, PointsService, BadgesService],
})
export class GamificationModule {}
