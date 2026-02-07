import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/festival-app',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ],
  
  // Rate Limiting
  rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '5000', 10),
  
  // File Upload
  uploadMaxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10), // 10MB
  uploadPath: process.env.UPLOAD_PATH || 'uploads',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'INFO',
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  
  // Pagination
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE || '10', 10),
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE || '100', 10),
} as const;

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'];

if (config.nodeEnv === 'production') {
  requiredEnvVars.push('MONGO_URI');
}

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config;