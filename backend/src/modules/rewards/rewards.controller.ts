import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('rewards')
@Controller('rewards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available rewards' })
  @ApiResponse({ status: 200, description: 'Rewards retrieved' })
  async findAll() {
    const rewards = await this.rewardsService.findAllRewards();
    return {
      success: true,
      data: rewards,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: rewards.length,
      },
    };
  }

  @Get('my')
  @ApiOperation({ summary: 'Get user redeemed rewards' })
  @ApiResponse({ status: 200, description: 'User rewards retrieved' })
  async findMyRewards(@Request() req) {
    const rewards = await this.rewardsService.findUserRewards(req.user.id);
    return {
      success: true,
      data: rewards,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: rewards.length,
      },
    };
  }

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem a reward' })
  @ApiResponse({ status: 201, description: 'Reward redeemed successfully' })
  @ApiResponse({ status: 400, description: 'Insufficient points or reward unavailable' })
  async redeem(@Request() req, @Body() redeemRewardDto: RedeemRewardDto) {
    const userReward = await this.rewardsService.redeemReward(
      req.user.id,
      redeemRewardDto.rewardId,
    );
    return {
      success: true,
      data: userReward,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Patch(':id/use')
  @ApiOperation({ summary: 'Mark reward as used' })
  @ApiResponse({ status: 200, description: 'Reward marked as used' })
  @ApiResponse({ status: 404, description: 'Reward not found' })
  async markAsUsed(@Param('id') id: string, @Request() req) {
    const userReward = await this.rewardsService.markRewardAsUsed(id, req.user.id);
    return {
      success: true,
      data: userReward,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
