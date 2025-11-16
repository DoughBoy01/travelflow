import { IsEnum, IsOptional, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsEventType } from '@shared/types/analytics.types';

export class TrackEventDto {
  @ApiProperty({ enum: AnalyticsEventType, example: AnalyticsEventType.FEEDBACK_SUBMITTED })
  @IsEnum(AnalyticsEventType)
  type: AnalyticsEventType;

  @ApiProperty({ type: 'object', required: false })
  @IsOptional()
  @IsObject()
  properties?: Record<string, any>;

  @ApiProperty({ example: 'session_123', required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
