import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global prefix
  const apiPrefix = configService.get('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  // CORS
  const corsOrigins = configService.get('CORS_ORIGINS', '').split(',');
  app.enableCors({
    origin: corsOrigins.length > 0 ? corsOrigins : '*',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('TravelFlow API')
    .setDescription('Comprehensive travel feedback platform API')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('feedback', 'Feedback collection endpoints')
    .addTag('gamification', 'Gamification and rewards endpoints')
    .addTag('rewards', 'Rewards redemption endpoints')
    .addTag('notifications', 'Notification management endpoints')
    .addTag('analytics', 'Analytics and impact endpoints')
    .addTag('ai', 'AI services (transcription, image analysis)')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', 3000);
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
