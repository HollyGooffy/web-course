import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { createError } from '../utils/errors';
import logger from '../utils/logger';

export abstract class BaseController {
  protected async handleRequest<T>(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
    operation: () => Promise<T>,
    successMessage?: string,
    statusCode: number = 200
  ): Promise<void> {
    try {
      const result = await operation();
      
      if (successMessage) {
        logger.info(successMessage, { 
          userId: req.user?.id,
          method: req.method,
          path: req.path 
        });
      }

      res.status(statusCode).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error('Controller operation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.user?.id,
        method: req.method,
        path: req.path,
        stack: error instanceof Error ? error.stack : undefined
      });
      next(error);
    }
  }

  protected validateUser(req: AuthRequest): void {
    if (!req.user) {
      throw createError('User not authenticated', 401);
    }
  }

  protected validateAdmin(req: AuthRequest): void {
    this.validateUser(req);
    if (req.user!.role !== 'admin') {
      throw createError('Admin access required', 403);
    }
  }

  protected getPaginationParams(req: AuthRequest): { page: number; limit: number; skip: number } {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;
    
    return { page, limit, skip };
  }

  protected getSearchParams(req: AuthRequest): { search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' } {
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = (req.query.sortOrder as string) === 'asc' ? 'asc' : 'desc';
    
    return { search, sortBy, sortOrder };
  }
}