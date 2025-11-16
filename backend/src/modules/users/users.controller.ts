import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    const { password, ...result } = user;
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    const { password, ...result } = user;
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'User updated' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    const { password, ...result } = user;
    return {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  async deleteAccount(@Request() req) {
    await this.usersService.remove(req.user.id);
    return {
      success: true,
      data: { message: 'Account deleted successfully' },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: 'req_' + Date.now(),
      },
    };
  }
}
