import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        ttl: configService.get('THROTTLE_TTL', 60),
        limit: configService.get('THROTTLE_LIMIT', 100),
      }],
    }),

    // Scheduled tasks
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    UsersModule,
    FeedbackModule,
    GamificationModule,
    RewardsModule,
    NotificationsModule,
    AnalyticsModule,
    AiModule,
  ],
})
export class AppModule {}
