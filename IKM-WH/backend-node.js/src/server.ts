import app from './app';
import { connectDatabase } from './config/database';
import logger from './utils/logger';
import config from './config';

const startServer = async () => {
  try {
    logger.info('Starting server...', { 
      port: config.port, 
      environment: config.nodeEnv 
    });

    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start server
    const server = app.listen(config.port, () => {
      logger.info('Server started successfully', {
        port: config.port,
        environment: config.nodeEnv,
        apiUrl: `http://localhost:${config.port}/api`,
        healthUrl: `http://localhost:${config.port}/health`
      });
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}, shutting down gracefully...`);
      server.close(() => {
        logger.info('Server closed successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    process.exit(1);
  }
};

startServer();


