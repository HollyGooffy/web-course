import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  const errorInfo = {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  };

  if (err instanceof AppError) {
    // Operational errors - log as warning
    logger.warn('Operational error occurred', {
      ...errorInfo,
      statusCode: err.statusCode,
      isOperational: err.isOperational,
    });

    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // MongoDB duplicate key error
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    const message = `${field} already exists`;
    
    logger.warn('MongoDB duplicate key error', {
      ...errorInfo,
      field,
      keyPattern: (err as any).keyPattern,
    });

    res.status(400).json({
      success: false,
      error: message,
    });
    return;
  }

  // MongoDB validation error
  if ((err as any).name === 'ValidationError') {
    const errors = Object.values((err as any).errors).map((e: any) => e.message);
    const message = errors.join(', ');
    
    logger.warn('MongoDB validation error', {
      ...errorInfo,
      validationErrors: errors,
    });

    res.status(400).json({
      success: false,
      error: message,
    });
    return;
  }

  // Unexpected errors - log as error
  logger.error('Unexpected error occurred', errorInfo);

  // Default error response
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  res.status(500).json({
    success: false,
    error: message,
  });
};


