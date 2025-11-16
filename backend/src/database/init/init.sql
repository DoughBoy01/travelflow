-- Initial database setup script for TravelFlow
-- This runs automatically when PostgreSQL container starts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create TravelFlow database (if not exists)
SELECT 'CREATE DATABASE travelflow'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'travelflow')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE travelflow TO travelflow;
