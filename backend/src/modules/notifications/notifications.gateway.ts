import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private userSockets: Map<string, string> = new Map(); // userId -> socketId

  constructor(private readonly notificationsService: NotificationsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Remove from user sockets
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, userId: string) {
    this.logger.log(`User ${userId} registered with socket ${client.id}`);
    this.userSockets.set(userId, client.id);
    return { event: 'registered', data: { success: true } };
  }

  @SubscribeMessage('getUnreadCount')
  async handleGetUnreadCount(client: Socket, userId: string) {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { event: 'unreadCount', data: { count } };
  }

  // Method to send notification to specific user
  async sendToUser(userId: string, notification: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', notification);
      this.logger.log(`Sent notification to user ${userId}`);
    } else {
      this.logger.warn(`User ${userId} not connected`);
    }
  }

  // Method to broadcast to all connected users
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }
}
