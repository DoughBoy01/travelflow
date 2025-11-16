import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeImageDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
