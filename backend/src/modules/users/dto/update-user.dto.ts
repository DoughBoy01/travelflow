import { IsString, MaxLength, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
