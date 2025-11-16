import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Track an analytics event' })
  @ApiResponse({ status: 201, description: 'Event tracked successfully' })
  async trackEvent(@Request() req, @Body() trackEventDto: TrackEventDto) {
    const event = await this.analyticsService.trackEvent(req.user.id, trackEventDto);
    return {
      success: true,
      data: event,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('impact/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user impact statistics' })
  @ApiResponse({ status: 200, description: 'User impact retrieved' })
  async getUserImpact(@Request() req) {
    const impact = await this.analyticsService.getUserImpact(req.user.id);
    return {
      success: true,
      data: impact,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('impact/community')
  @ApiOperation({ summary: 'Get community impact statistics' })
  @ApiResponse({ status: 200, description: 'Community impact retrieved' })
  async getCommunityImpact() {
    const impact = await this.analyticsService.getCommunityImpact();
    return {
      success: true,
      data: impact,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get('events/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get event statistics' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ status: 200, description: 'Event stats retrieved' })
  async getEventStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const stats = await this.analyticsService.getEventStats(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
    return {
      success: true,
      data: stats,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
