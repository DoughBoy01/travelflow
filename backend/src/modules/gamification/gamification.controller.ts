import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { PointsService } from './points.service';
import { BadgesService } from './badges.service';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('gamification')
@Controller('gamification')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GamificationController {
  constructor(
    private readonly gamificationService: GamificationService,
    private readonly pointsService: PointsService,
    private readonly badgesService: BadgesService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user gamification profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  async getProfile(@Request() req) {
    const profile = await this.gamificationService.getUserProfile(req.user.id);
    return {
      success: true,
      data: profile,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('points')
  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({ status: 200, description: 'Points retrieved' })
  async getPoints(@Request() req) {
    const points = await this.pointsService.getPoints(req.user.id);
    const level = await this.pointsService.getLevel(req.user.id);
    const pointsForNextLevel = this.pointsService.getPointsForNextLevel(points);

    return {
      success: true,
      data: {
        points,
        level,
        pointsForNextLevel,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('badges')
  @ApiOperation({ summary: 'Get all available badges' })
  @ApiResponse({ status: 200, description: 'Badges retrieved' })
  async getAllBadges() {
    const badges = await this.badgesService.getAllBadges();
    return {
      success: true,
      data: badges,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: badges.length,
      },
    };
  }

  @Get('badges/my')
  @ApiOperation({ summary: 'Get user earned badges' })
  @ApiResponse({ status: 200, description: 'User badges retrieved' })
  async getMyBadges(@Request() req) {
    const badges = await this.badgesService.getUserBadges(req.user.id);
    return {
      success: true,
      data: badges,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: badges.length,
      },
    };
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get leaderboard' })
  @ApiQuery({ name: 'period', enum: ['weekly', 'monthly', 'alltime'], required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved' })
  async getLeaderboard(
    @Request() req,
    @Query('period') period?: 'weekly' | 'monthly' | 'alltime',
    @Query('limit') limit?: number,
  ) {
    const leaderboard = await this.leaderboardService.getLeaderboard(
      period || 'alltime',
      limit ? parseInt(limit.toString()) : 100,
      req.user.id,
    );

    return {
      success: true,
      data: {
        period: period || 'alltime',
        ...leaderboard,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({ status: 200, description: 'User stats retrieved' })
  async getStats(@Request() req) {
    const stats = await this.leaderboardService.getUserStats(req.user.id);
    return {
      success: true,
      data: stats,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Post('badges/seed')
  @ApiOperation({ summary: 'Seed initial badges (admin only)' })
  @ApiResponse({ status: 201, description: 'Badges seeded' })
  async seedBadges() {
    await this.badgesService.seedBadges();
    return {
      success: true,
      data: { message: 'Badges seeded successfully' },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
