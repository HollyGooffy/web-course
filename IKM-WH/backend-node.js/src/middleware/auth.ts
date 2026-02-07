import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JWTPayload } from '../types';
import { createError } from '../utils/errors';
import logger from '../utils/logger';
import config from '../config';

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authentication failed: missing or invalid authorization header', {
        path: req.path,
        method: req.method,
        ip: req.ip
      });
      throw createError('Authorization token required', 401);
    }

    const token = authHeader.substring(7);

    if (!config.jwtSecret) {
      logger.error('JWT secret not configured');
      throw createError('JWT secret not configured', 500);
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    logger.debug('User authenticated successfully', {
      userId: decoded.id,
      email: decoded.email,
      path: req.path,
      method: req.method
    });

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      logger.warn('Authentication failed: invalid or expired token', {
        error: error.message,
        path: req.path,
        method: req.method,
        ip: req.ip
      });
      next(createError('Invalid or expired token', 401));
    } else {
      logger.error('Authentication error', {
        error: error.message,
        path: req.path,
        method: req.method,
        ip: req.ip
      });
      next(error);
    }
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    logger.warn('Admin access denied: user not authenticated', {
      path: req.path,
      method: req.method,
      ip: req.ip
    });
    next(createError('Authentication required', 401));
    return;
  }

  if (req.user.role !== 'admin') {
    logger.warn('Admin access denied: insufficient permissions', {
      userId: req.user.id,
      role: req.user.role,
      path: req.path,
      method: req.method,
      ip: req.ip
    });
    next(createError('Admin access required', 403));
    return;
  }

  logger.debug('Admin access granted', {
    userId: req.user.id,
    path: req.path,
    method: req.method
  });

  next();
};


