import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TranscribeAudioDto {
  @ApiProperty({ example: 'https://example.com/audio.mp3' })
  @IsString()
  @IsNotEmpty()
  audioUrl: string;

  @ApiProperty({ example: 'en', required: false })
  @IsOptional()
  @IsString()
  language?: string;
}
