import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async addPoints(userId: string, points: number): Promise<User> {
    const user = await this.findById(userId);
    user.totalPoints += points;
    // Recalculate level based on total points
    user.level = this.calculateLevel(user.totalPoints);
    return this.userRepository.save(user);
  }

  private calculateLevel(totalPoints: number): number {
    const levels = [
      { level: 1, points: 0 },
      { level: 2, points: 100 },
      { level: 3, points: 250 },
      { level: 4, points: 500 },
      { level: 5, points: 1000 },
      { level: 6, points: 2000 },
      { level: 7, points: 4000 },
      { level: 8, points: 7000 },
      { level: 9, points: 12000 },
      { level: 10, points: 20000 },
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalPoints >= levels[i].points) {
        return levels[i].level;
      }
    }
    return 1;
  }
}
