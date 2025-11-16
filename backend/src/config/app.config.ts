export const appConfig = {
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

export const swaggerConfig = {
  title: 'TravelFlow API',
  description: 'The TravelFlow API documentation',
  version: '1.0',
  tag: 'travelflow',
};
