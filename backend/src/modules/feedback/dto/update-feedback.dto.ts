import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FeedbackStatus } from '@shared/types/feedback.types';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiProperty({ enum: FeedbackStatus, example: FeedbackStatus.ARCHIVED, required: false })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;
}
