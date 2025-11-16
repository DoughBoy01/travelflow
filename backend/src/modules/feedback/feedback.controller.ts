import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FeedbackStatus } from '@shared/types/feedback.types';

@ApiTags('feedback')
@Controller('feedback')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit new feedback' })
  @ApiResponse({ status: 201, description: 'Feedback submitted successfully' })
  async create(@Request() req, @Body() createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.feedbackService.create(req.user.id, createFeedbackDto);
    return {
      success: true,
      data: {
        feedbackId: feedback.id,
        points: feedback.pointsAwarded,
        feedback,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedback' })
  @ApiQuery({ name: 'status', enum: FeedbackStatus, required: false })
  @ApiResponse({ status: 200, description: 'Feedback list retrieved' })
  async findAll(@Request() req, @Query('status') status?: FeedbackStatus) {
    const feedbacks = await this.feedbackService.findAll(req.user.id, status);
    return {
      success: true,
      data: feedbacks,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: feedbacks.length,
      },
    };
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user feedback' })
  @ApiResponse({ status: 200, description: 'User feedback retrieved' })
  async findMyFeedback(@Request() req) {
    const feedbacks = await this.feedbackService.findByUser(req.user.id);
    return {
      success: true,
      data: feedbacks,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: feedbacks.length,
      },
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user feedback statistics' })
  @ApiResponse({ status: 200, description: 'Feedback stats retrieved' })
  async getStats(@Request() req) {
    const stats = await this.feedbackService.getStats(req.user.id);
    return {
      success: true,
      data: stats,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiResponse({ status: 200, description: 'Feedback found' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    const feedback = await this.feedbackService.findOne(id, req.user.id);
    return {
      success: true,
      data: feedback,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feedback' })
  @ApiResponse({ status: 200, description: 'Feedback updated' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    const feedback = await this.feedbackService.update(id, req.user.id, updateFeedbackDto);
    return {
      success: true,
      data: feedback,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback' })
  @ApiResponse({ status: 200, description: 'Feedback deleted' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.feedbackService.remove(id, req.user.id);
    return {
      success: true,
      data: { message: 'Feedback deleted successfully' },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
