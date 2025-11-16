import { DataSource } from 'typeorm';
import { seedBadges } from './badge-seeds';
import { seedRewards } from './reward-seeds';
import { seedImpactEvents } from './impact-event-seeds';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

async function runSeeds() {
  console.log('🌱 Starting database seeding...');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    // Run seeds
    await seedBadges(AppDataSource);
    await seedRewards(AppDataSource);
    await seedImpactEvents(AppDataSource);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();
