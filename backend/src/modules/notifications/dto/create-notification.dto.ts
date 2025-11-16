import { IsEnum, IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({ enum: NotificationType, example: NotificationType.POINTS_EARNED })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ example: 'Points Earned!' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'You earned 50 points for submitting feedback!' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: 'object', required: false })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}
