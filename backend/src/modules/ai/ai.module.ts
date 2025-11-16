import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { VoiceTranscriptionService } from './voice-transcription.service';
import { ImageAnalysisService } from './image-analysis.service';

@Module({
  controllers: [AiController],
  providers: [AiService, VoiceTranscriptionService, ImageAnalysisService],
  exports: [AiService, VoiceTranscriptionService, ImageAnalysisService],
})
export class AiModule {}
