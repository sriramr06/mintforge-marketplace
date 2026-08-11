import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const errors: string[] = [];

function requireString(name: string, minLength?: number): string {
  const value = process.env[name];
  if (!value) {
    errors.push(`${name} is required`);
    return '';
  }
  if (minLength && value.length < minLength) {
    errors.push(`${name} must be at least ${minLength} characters`);
  }
  return value;
}

function optionalString(name: string): string | undefined {
  return process.env[name] || undefined;
}

function numberWithDefault(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (!value) return defaultValue;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    errors.push(`${name} must be a number`);
    return defaultValue;
  }
  return parsed;
}

function stringWithDefault(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

function enumWithDefault<T extends string>(name: string, allowed: readonly T[], defaultValue: T): T {
  const value = process.env[name];
  if (!value) return defaultValue;
  if (!allowed.includes(value as T)) {
    errors.push(`${name} must be one of: ${allowed.join(', ')}`);
    return defaultValue;
  }
  return value as T;
}

function urlWithDefault(name: string, defaultValue: string): string {
  const value = process.env[name] || defaultValue;
  try {
    new URL(value);
  } catch {
    errors.push(`${name} must be a valid URL`);
  }
  return value;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optionalEmail(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  if (!EMAIL_REGEX.test(value)) {
    errors.push(`${name} must be a valid email`);
  }
  return value;
}

export const env = {
  // Server
  NODE_ENV: enumWithDefault('NODE_ENV', ['development', 'test', 'production'] as const, 'development'),
  PORT: numberWithDefault('PORT', 5000),
  CLIENT_URL: urlWithDefault('CLIENT_URL', 'http://localhost:5173'),

  // Database
  MONGO_URI: requireString('MONGO_URI'),

  // JWT
  JWT_SECRET: requireString('JWT_SECRET', 32),
  JWT_ACCESS_EXPIRES_IN: stringWithDefault('JWT_ACCESS_EXPIRES_IN', '30m'),
  JWT_REFRESH_EXPIRES_IN: stringWithDefault('JWT_REFRESH_EXPIRES_IN', '7d'),

  // Salt 
  BCRYPT_SALT_ROUNDS: numberWithDefault('BCRYPT_SALT_ROUNDS', 10),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: optionalString('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: optionalString('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: optionalString('CLOUDINARY_API_SECRET'),

  // Stripe
  STRIPE_SECRET_KEY: optionalString('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: optionalString('STRIPE_WEBHOOK_SECRET'),

  // Email (SMTP)
  SMTP_HOST: optionalString('SMTP_HOST'),
  SMTP_PORT: numberWithDefault('SMTP_PORT', 587),
  SMTP_USER: optionalString('SMTP_USER'),
  SMTP_PASS: optionalString('SMTP_PASS'),
  EMAIL_FROM: optionalEmail('EMAIL_FROM'),
};

if (errors.length > 0) {
  throw new Error(`Invalid environment variables:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
}
