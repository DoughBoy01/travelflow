import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ENUM types
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM ('user', 'admin', 'moderator');
    `);

    await queryRunner.query(`
      CREATE TYPE "user_status_enum" AS ENUM ('active', 'suspended', 'deleted');
    `);

    await queryRunner.query(`
      CREATE TYPE "feedback_input_mode_enum" AS ENUM ('emoji', 'star', 'quick_text', 'text', 'voice', 'photo', 'hybrid');
    `);

    await queryRunner.query(`
      CREATE TYPE "feedback_status_enum" AS ENUM ('active', 'archived', 'deleted');
    `);

    await queryRunner.query(`
      CREATE TYPE "badge_rarity_enum" AS ENUM ('common', 'rare', 'epic', 'legendary');
    `);

    await queryRunner.query(`
      CREATE TYPE "reward_type_enum" AS ENUM ('travel_credit', 'seat_upgrade', 'lounge_access', 'hotel_upgrade', 'discount', 'vip_status');
    `);

    await queryRunner.query(`
      CREATE TYPE "reward_status_enum" AS ENUM ('active', 'used', 'expired');
    `);

    await queryRunner.query(`
      CREATE TYPE "notification_type_enum" AS ENUM ('feedback_prompt', 'points_earned', 'badge_earned', 'reward_available', 'impact_update', 'system');
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "name" VARCHAR(255),
        "avatar_url" TEXT,
        "total_points" INTEGER DEFAULT 0,
        "level" INTEGER DEFAULT 1,
        "role" user_role_enum DEFAULT 'user',
        "status" user_status_enum DEFAULT 'active',
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_users_email" ON "users"("email");
      CREATE INDEX "idx_users_points" ON "users"("total_points" DESC);
      CREATE INDEX "idx_users_level" ON "users"("level" DESC);
    `);

    // Create feedback table
    await queryRunner.query(`
      CREATE TABLE "feedback" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE,
        "type" feedback_input_mode_enum NOT NULL,
        "content" JSONB NOT NULL,
        "context" JSONB NOT NULL,
        "privacy_settings" JSONB NOT NULL,
        "points_awarded" INTEGER DEFAULT 0,
        "is_anonymous" BOOLEAN DEFAULT FALSE,
        "status" feedback_status_enum DEFAULT 'active',
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_feedback_user" ON "feedback"("user_id");
      CREATE INDEX "idx_feedback_type" ON "feedback"("type");
      CREATE INDEX "idx_feedback_status" ON "feedback"("status");
      CREATE INDEX "idx_feedback_created" ON "feedback"("created_at" DESC);
      CREATE INDEX "idx_feedback_context" ON "feedback" USING GIN("context");
    `);

    // Create badges table
    await queryRunner.query(`
      CREATE TABLE "badges" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "code" VARCHAR(100) UNIQUE NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "icon_url" TEXT,
        "criteria" JSONB NOT NULL,
        "points_value" INTEGER DEFAULT 0,
        "rarity" badge_rarity_enum DEFAULT 'common',
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_badges_code" ON "badges"("code");
      CREATE INDEX "idx_badges_rarity" ON "badges"("rarity");
    `);

    // Create user_badges table
    await queryRunner.query(`
      CREATE TABLE "user_badges" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE,
        "badge_id" UUID REFERENCES "badges"("id") ON DELETE CASCADE,
        "earned_at" TIMESTAMP DEFAULT NOW(),
        UNIQUE("user_id", "badge_id")
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_user_badges_user" ON "user_badges"("user_id");
      CREATE INDEX "idx_user_badges_badge" ON "user_badges"("badge_id");
    `);

    // Create rewards table
    await queryRunner.query(`
      CREATE TABLE "rewards" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "type" reward_type_enum NOT NULL,
        "points_required" INTEGER NOT NULL,
        "value_usd" DECIMAL(10, 2),
        "availability" INTEGER,
        "image_url" TEXT,
        "terms_url" TEXT,
        "expires_at" TIMESTAMP,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_rewards_type" ON "rewards"("type");
      CREATE INDEX "idx_rewards_points" ON "rewards"("points_required");
    `);

    // Create user_rewards table
    await queryRunner.query(`
      CREATE TABLE "user_rewards" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE,
        "reward_id" UUID REFERENCES "rewards"("id") ON DELETE CASCADE,
        "redemption_code" VARCHAR(255) NOT NULL,
        "status" reward_status_enum DEFAULT 'active',
        "redeemed_at" TIMESTAMP DEFAULT NOW(),
        "used_at" TIMESTAMP,
        "expires_at" TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_user_rewards_user" ON "user_rewards"("user_id");
      CREATE INDEX "idx_user_rewards_status" ON "user_rewards"("status");
      CREATE INDEX "idx_user_rewards_code" ON "user_rewards"("redemption_code");
    `);

    // Create impact_events table
    await queryRunner.query(`
      CREATE TABLE "impact_events" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "category" VARCHAR(100),
        "related_feedback_ids" UUID[],
        "travelers_impacted" INTEGER DEFAULT 0,
        "occurred_at" TIMESTAMP NOT NULL,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_impact_events_category" ON "impact_events"("category");
      CREATE INDEX "idx_impact_events_occurred" ON "impact_events"("occurred_at" DESC);
    `);

    // Create notifications table
    await queryRunner.query(`
      CREATE TABLE "notifications" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES "users"("id") ON DELETE CASCADE,
        "type" notification_type_enum NOT NULL,
        "title" VARCHAR(255) NOT NULL,
        "message" TEXT NOT NULL,
        "is_read" BOOLEAN DEFAULT FALSE,
        "metadata" JSONB,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_notifications_user" ON "notifications"("user_id");
      CREATE INDEX "idx_notifications_read" ON "notifications"("is_read");
      CREATE INDEX "idx_notifications_created" ON "notifications"("created_at" DESC);
    `);

    // Create analytics_events table
    await queryRunner.query(`
      CREATE TABLE "analytics_events" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES "users"("id") ON DELETE SET NULL,
        "type" VARCHAR(100) NOT NULL,
        "properties" JSONB,
        "session_id" VARCHAR(255),
        "timestamp" TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_analytics_events_user" ON "analytics_events"("user_id");
      CREATE INDEX "idx_analytics_events_type" ON "analytics_events"("type");
      CREATE INDEX "idx_analytics_events_timestamp" ON "analytics_events"("timestamp" DESC);
      CREATE INDEX "idx_analytics_events_session" ON "analytics_events"("session_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS "analytics_events" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "notifications" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "impact_events" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_rewards" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "rewards" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_badges" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "badges" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "feedback" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE;`);

    // Drop ENUM types
    await queryRunner.query(`DROP TYPE IF EXISTS "notification_type_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "reward_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "reward_type_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "badge_rarity_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "feedback_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "feedback_input_mode_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_role_enum";`);
  }
}
