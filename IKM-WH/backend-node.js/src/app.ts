import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import performanceMonitor from './middleware/performanceMonitor';
import logger from './utils/logger';
import config from './config';
import authRoutes from './routes/authRoutes';
import applicationRoutes from './routes/applicationRoutes';
import groupRoutes from './routes/groupRoutes';
import merchRoutes from './routes/merchRoutes';
import festivalRoutes from './routes/festivalRoutes';
import cardRoutes from './routes/cardRoutes';
import posterRoutes from './routes/posterRoutes';
import eventRoutes from './routes/eventRoutes';
import contentRoutes from './routes/contentRoutes';
import statsRoutes from './routes/statsRoutes';
import participantCardsRoutes from './routes/participantCards';

const app: Express = express();

// Performance monitoring (first middleware)
if (config.nodeEnv !== 'test') {
  app.use(performanceMonitor.middleware);
}

// Request logging middleware
if (config.nodeEnv !== 'test') {
  app.use(requestLogger);
}

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow localhost on any port
    if (config.nodeEnv === 'development' && origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return callback(null, true);
    }
    
    if (config.corsOrigin.includes(origin)) {
      return callback(null, true);
    } else {
      logger.warn('CORS blocked origin', { origin });
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      error: 'Too many requests from this IP, please try again later.',
    });
  },
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: `${config.uploadMaxSize}b` }));
app.use(express.urlencoded({ extended: true, limit: `${config.uploadMaxSize}b` }));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Serve uploaded files with CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
}, express.static(path.join(process.cwd(), config.uploadPath)));

// Health check with performance metrics
app.get('/health', (req, res) => {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0',
    performance: performanceMonitor.getMetrics(),
  };
  
  logger.debug('Health check requested', healthData);
  res.json(healthData);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/merch', merchRoutes);
app.use('/api/festivals', festivalRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/participant-cards', participantCardsRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req, res) => {
  logger.warn('Route not found', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });
  
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;


