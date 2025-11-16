import { IsEnum, IsObject, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FeedbackInputMode, FeedbackTrigger, FeedbackCategory } from '@shared/types/feedback.types';

class LocationDto {
  @ApiProperty({ example: 40.7128 })
  lat: number;

  @ApiProperty({ example: -74.006 })
  lng: number;

  @ApiProperty({ example: 10, required: false })
  accuracy?: number;
}

class FeedbackContextDto {
  @ApiProperty({ enum: FeedbackTrigger, example: FeedbackTrigger.FLIGHT_LANDED })
  @IsEnum(FeedbackTrigger)
  trigger: FeedbackTrigger;

  @ApiProperty({ example: 'booking-123', required: false })
  @IsOptional()
  bookingId?: string;

  @ApiProperty({ example: 'AA123', required: false })
  @IsOptional()
  flightNumber?: string;

  @ApiProperty({ example: 'hotel-456', required: false })
  @IsOptional()
  hotelId?: string;

  @ApiProperty({ type: LocationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiProperty({ example: '2024-11-16T12:00:00Z' })
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({ enum: FeedbackCategory, example: FeedbackCategory.AIRLINE_MEAL, required: false })
  @IsOptional()
  @IsEnum(FeedbackCategory)
  category?: FeedbackCategory;

  @ApiProperty({ type: 'object', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

class FeedbackPrivacyDto {
  @ApiProperty({ example: false })
  isAnonymous: boolean;

  @ApiProperty({ example: true })
  shareWithService: boolean;

  @ApiProperty({ example: false })
  sharePublicly: boolean;

  @ApiProperty({ example: true })
  allowDataAnalytics: boolean;

  @ApiProperty({ example: true })
  allowAIAnalysis: boolean;

  @ApiProperty({ example: 'forever' })
  retentionPeriod: string;
}

export class CreateFeedbackDto {
  @ApiProperty({ enum: FeedbackInputMode, example: FeedbackInputMode.STAR_RATING })
  @IsEnum(FeedbackInputMode)
  type: FeedbackInputMode;

  @ApiProperty({
    example: { rating: 5, category: 'airline_meal' },
    description: 'Content varies by type: emoji, star rating, text, voice, photo, or hybrid'
  })
  @IsObject()
  @IsNotEmpty()
  content: Record<string, any>;

  @ApiProperty({ type: FeedbackContextDto })
  @ValidateNested()
  @Type(() => FeedbackContextDto)
  @IsNotEmpty()
  context: FeedbackContextDto;

  @ApiProperty({ type: FeedbackPrivacyDto })
  @ValidateNested()
  @Type(() => FeedbackPrivacyDto)
  @IsNotEmpty()
  privacy: FeedbackPrivacyDto;
}
