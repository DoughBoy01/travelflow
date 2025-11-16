import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved' })
  async findAll(@Request() req) {
    const notifications = await this.notificationsService.findAll(req.user.id);
    return {
      success: true,
      data: notifications,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: notifications.length,
      },
    };
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get unread notifications' })
  @ApiResponse({ status: 200, description: 'Unread notifications retrieved' })
  async findUnread(@Request() req) {
    const notifications = await this.notificationsService.findUnread(req.user.id);
    return {
      success: true,
      data: notifications,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
        total: notifications.length,
      },
    };
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Get unread notification count' })
  @ApiResponse({ status: 200, description: 'Unread count retrieved' })
  async getUnreadCount(@Request() req) {
    const count = await this.notificationsService.getUnreadCount(req.user.id);
    return {
      success: true,
      data: { count },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(@Param('id') id: string, @Request() req) {
    const notification = await this.notificationsService.markAsRead(id, req.user.id);
    return {
      success: true,
      data: notification,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@Request() req) {
    await this.notificationsService.markAllAsRead(req.user.id);
    return {
      success: true,
      data: { message: 'All notifications marked as read' },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
