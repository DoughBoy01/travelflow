import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(userId: string, createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      userId,
      ...createNotificationDto,
    });
    return this.notificationRepository.save(notification);
  }

  async findAll(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findUnread(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId, read: false },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId },
    });

    if (notification && !notification.read) {
      notification.read = true;
      notification.readAt = new Date();
      return this.notificationRepository.save(notification);
    }

    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { userId, read: false },
      { read: true, readAt: new Date() },
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.count({
      where: { userId, read: false },
    });
  }

  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, any>,
  ): Promise<Notification> {
    return this.create(userId, { type, title, message, data });
  }
}
