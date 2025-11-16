import { Injectable } from '@nestjs/common';
import { VoiceTranscriptionService } from './voice-transcription.service';
import { ImageAnalysisService } from './image-analysis.service';

@Injectable()
export class AiService {
  constructor(
    private readonly voiceTranscriptionService: VoiceTranscriptionService,
    private readonly imageAnalysisService: ImageAnalysisService,
  ) {}

  async transcribeAudio(audioUrl: string, language?: string) {
    const transcription = await this.voiceTranscriptionService.transcribeAudio(
      audioUrl,
      language,
    );
    const sentiment = await this.voiceTranscriptionService.analyzeSentiment(
      transcription.text,
    );

    return {
      transcription,
      sentiment,
    };
  }

  async analyzeImage(imageUrl: string) {
    const [analysis, moderation] = await Promise.all([
      this.imageAnalysisService.analyzeImage(imageUrl),
      this.imageAnalysisService.detectInappropriateContent(imageUrl),
    ]);

    return {
      analysis,
      moderation,
    };
  }

  async extractTextFromImage(imageUrl: string) {
    return this.imageAnalysisService.extractText(imageUrl);
  }
}
