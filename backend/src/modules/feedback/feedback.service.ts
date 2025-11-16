import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackInputMode, FeedbackStatus } from '@shared/types/feedback.types';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(userId: string, createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    // Calculate points based on feedback type
    const pointsAwarded = this.calculatePoints(createFeedbackDto.type);

    const feedback = this.feedbackRepository.create({
      userId,
      ...createFeedbackDto,
      pointsAwarded,
    });

    return this.feedbackRepository.save(feedback);
  }

  async findAll(userId?: string, status?: FeedbackStatus): Promise<Feedback[]> {
    const query = this.feedbackRepository.createQueryBuilder('feedback');

    if (userId) {
      query.andWhere('feedback.userId = :userId', { userId });
    }

    if (status) {
      query.andWhere('feedback.status = :status', { status });
    }

    query.orderBy('feedback.createdAt', 'DESC');

    return query.getMany();
  }

  async findOne(id: string, userId?: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    // If userId is provided, check ownership (unless feedback is public)
    if (userId && feedback.userId !== userId && !feedback.privacy.sharePublicly) {
      throw new ForbiddenException('You do not have access to this feedback');
    }

    return feedback;
  }

  async findByUser(userId: string): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: { userId, status: FeedbackStatus.ACTIVE },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, userId: string, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.findOne(id);

    // Only allow owner to update
    if (feedback.userId !== userId) {
      throw new ForbiddenException('You can only update your own feedback');
    }

    Object.assign(feedback, updateFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: string, userId: string): Promise<void> {
    const feedback = await this.findOne(id);

    // Only allow owner to delete
    if (feedback.userId !== userId) {
      throw new ForbiddenException('You can only delete your own feedback');
    }

    // Soft delete by updating status
    feedback.status = FeedbackStatus.DELETED;
    await this.feedbackRepository.save(feedback);
  }

  async getStats(userId: string): Promise<{
    totalFeedback: number;
    totalPoints: number;
    byType: Record<string, number>;
    byCategory: Record<string, number>;
  }> {
    const feedbacks = await this.feedbackRepository.find({
      where: { userId, status: FeedbackStatus.ACTIVE },
    });

    const stats = {
      totalFeedback: feedbacks.length,
      totalPoints: feedbacks.reduce((sum, f) => sum + f.pointsAwarded, 0),
      byType: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
    };

    feedbacks.forEach(feedback => {
      // Count by type
      stats.byType[feedback.type] = (stats.byType[feedback.type] || 0) + 1;

      // Count by category
      if (feedback.context.category) {
        stats.byCategory[feedback.context.category] =
          (stats.byCategory[feedback.context.category] || 0) + 1;
      }
    });

    return stats;
  }

  private calculatePoints(type: FeedbackInputMode): number {
    const pointsMap: Record<FeedbackInputMode, number> = {
      [FeedbackInputMode.EMOJI]: 5,
      [FeedbackInputMode.STAR_RATING]: 10,
      [FeedbackInputMode.QUICK_TEXT]: 15,
      [FeedbackInputMode.FREE_TEXT]: 25,
      [FeedbackInputMode.VOICE]: 50,
      [FeedbackInputMode.PHOTO]: 50,
      [FeedbackInputMode.HYBRID]: 75,
    };

    return pointsMap[type] || 10;
  }
}
