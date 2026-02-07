import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import logger from '../utils/logger';
import { createError } from '../utils/errors';

// Декоратор для логирования методов
export function LogMethod(message?: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const logMessage = message || `${className}.${propertyName} called`;
      
      logger.debug(logMessage, { 
        className, 
        method: propertyName,
        args: args.length 
      });

      const startTime = Date.now();
      try {
        const result = await method.apply(this, args);
        const duration = Date.now() - startTime;
        
        logger.debug(`${className}.${propertyName} completed`, { 
          duration: `${duration}ms` 
        });
        
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        logger.error(`${className}.${propertyName} failed`, {
          error: error instanceof Error ? error.message : 'Unknown error',
          duration: `${duration}ms`
        });
        throw error;
      }
    };
  };
}

// Декоратор для валидации аутентификации
export function RequireAuth(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = async function (req: AuthRequest, res: Response, next: NextFunction, ...args: any[]) {
    if (!req.user) {
      logger.warn('Unauthorized access attempt', {
        method: req.method,
        path: req.path,
        ip: req.ip
      });
      return next(createError('Authentication required', 401));
    }

    return method.apply(this, [req, res, next, ...args]);
  };
}

// Декоратор для валидации админских прав
export function RequireAdmin(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = async function (req: AuthRequest, res: Response, next: NextFunction, ...args: any[]) {
    if (!req.user) {
      return next(createError('Authentication required', 401));
    }

    if (req.user.role !== 'admin') {
      logger.warn('Admin access denied', {
        userId: req.user.id,
        role: req.user.role,
        method: req.method,
        path: req.path
      });
      return next(createError('Admin access required', 403));
    }

    return method.apply(this, [req, res, next, ...args]);
  };
}

// Декоратор для кэширования результатов
export function Cache(ttlSeconds: number = 300) {
  const cache = new Map<string, { data: any; expires: number }>();

  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}.${propertyName}:${JSON.stringify(args)}`;
      const now = Date.now();
      
      // Проверяем кэш
      const cached = cache.get(cacheKey);
      if (cached && cached.expires > now) {
        logger.debug('Cache hit', { cacheKey });
        return cached.data;
      }

      // Выполняем метод
      const result = await method.apply(this, args);
      
      // Сохраняем в кэш
      cache.set(cacheKey, {
        data: result,
        expires: now + (ttlSeconds * 1000)
      });

      logger.debug('Cache miss, result cached', { cacheKey, ttlSeconds });
      return result;
    };
  };
}

// Декоратор для retry логики
export function Retry(maxAttempts: number = 3, delayMs: number = 1000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: Error;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await method.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          
          if (attempt === maxAttempts) {
            logger.error(`Method ${propertyName} failed after ${maxAttempts} attempts`, {
              error: lastError.message,
              attempts: maxAttempts
            });
            throw lastError;
          }

          logger.warn(`Method ${propertyName} failed, retrying...`, {
            attempt,
            maxAttempts,
            error: lastError.message
          });

          // Задержка перед повтором
          await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
        }
      }
      
      throw lastError!;
    };
  };
}