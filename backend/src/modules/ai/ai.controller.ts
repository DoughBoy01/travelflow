import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { TranscribeAudioDto } from './dto/transcribe-audio.dto';
import { AnalyzeImageDto } from './dto/analyze-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('transcribe')
  @ApiOperation({ summary: 'Transcribe audio to text' })
  @ApiResponse({ status: 200, description: 'Audio transcribed successfully' })
  async transcribeAudio(@Body() transcribeAudioDto: TranscribeAudioDto) {
    const result = await this.aiService.transcribeAudio(
      transcribeAudioDto.audioUrl,
      transcribeAudioDto.language,
    );
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Post('analyze-image')
  @ApiOperation({ summary: 'Analyze image content' })
  @ApiResponse({ status: 200, description: 'Image analyzed successfully' })
  async analyzeImage(@Body() analyzeImageDto: AnalyzeImageDto) {
    const result = await this.aiService.analyzeImage(analyzeImageDto.imageUrl);
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Post('extract-text')
  @ApiOperation({ summary: 'Extract text from image (OCR)' })
  @ApiResponse({ status: 200, description: 'Text extracted successfully' })
  async extractText(@Body() analyzeImageDto: AnalyzeImageDto) {
    const result = await this.aiService.extractTextFromImage(analyzeImageDto.imageUrl);
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
