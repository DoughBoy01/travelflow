import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { Reward } from './entities/reward.entity';
import { UserReward } from './entities/user-reward.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, UserReward, User])],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService],
})
export class RewardsModule {}
