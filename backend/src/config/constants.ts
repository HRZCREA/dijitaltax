// src/config/constants.ts
import dotenv from 'dotenv';

dotenv.config();

// JWT Configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = '24h';

// Upload Configuration
export const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

// Database
export const DATABASE_URL = process.env.DATABASE_URL;

// Server
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';