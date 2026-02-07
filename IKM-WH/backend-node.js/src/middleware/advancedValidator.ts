import { body, query, param, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/errors';
import logger from '../utils/logger';

// Кастомные валидаторы
export const customValidators = {
  // Проверка силы пароля
  strongPassword: (value: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value.length < minLength) {
      throw new Error(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      throw new Error('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
      throw new Error('Password must contain at least one special character');
    }
    return true;
  },

  // Проверка российского номера телефона
  russianPhone: (value: string) => {
    const phoneRegex = /^\+7\d{10}$/;
    if (!phoneRegex.test(value)) {
      throw new Error('Phone must be in format +7XXXXXXXXXX');
    }
    return true;
  },

  // Проверка Telegram username
  telegramUsername: (value: string) => {
    const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(value)) {
      throw new Error('Telegram username must start with @ and be 5-32 characters');
    }
    return true;
  },

  // Проверка MongoDB ObjectId
  mongoId: (value: string) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(value)) {
      throw new Error('Invalid MongoDB ObjectId format');
    }
    return true;
  },

  // Проверка даты в будущем
  futureDate: (value: string) => {
    const date = new Date(value);
    const now = new Date();
    if (date <= now) {
      throw new Error('Date must be in the future');
    }
    return true;
  },

  // Проверка размера файла (в байтах)
  fileSize: (maxSizeBytes: number) => (value: any) => {
    if (value && value.size > maxSizeBytes) {
      const maxSizeMB = Math.round(maxSizeBytes / (1024 * 1024));
      throw new Error(`File size must not exceed ${maxSizeMB}MB`);
    }
    return true;
  },

  // Проверка типа файла
  fileType: (allowedTypes: string[]) => (value: any) => {
    if (value && !allowedTypes.includes(value.mimetype)) {
      throw new Error(`File type must be one of: ${allowedTypes.join(', ')}`);
    }
    return true;
  }
};

// Улучшенная функция валидации с логированием
export const validateWithLogging = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Выполняем все валидации
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => {
        if ('path' in err) {
          return `${err.path}: ${err.msg}`;
        } else if ('param' in err) {
          return `${(err as any).param}: ${err.msg}`;
        } else {
          return err.msg;
        }
      });

      // Логируем ошибки валидации
      logger.warn('Validation failed', {
        method: req.method,
        path: req.path,
        errors: errorMessages,
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip
      });

      next(createError(errorMessages.join(', '), 400));
      return;
    }

    logger.debug('Validation passed', {
      method: req.method,
      path: req.path
    });

    next();
  };
};

// Расширенные валидаторы для аутентификации
export const authValidators = {
  register: validateWithLogging([
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Email too long'),
    
    body('password')
      .custom(customValidators.strongPassword),
    
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Zа-яА-Я\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
  ]),

  login: validateWithLogging([
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ]),

  changePassword: validateWithLogging([
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    
    body('newPassword')
      .custom(customValidators.strongPassword),
    
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match');
        }
        return true;
      }),
  ]),

  updateProfile: validateWithLogging([
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Zа-яА-Я\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Email too long'),
  ]),
};

// Валидаторы для приложений
export const applicationValidators = {
  create: validateWithLogging([
    body('groupName')
      .trim()
      .notEmpty()
      .withMessage('Group name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Group name must be between 2 and 100 characters'),
    
    body('contactTelegram')
      .trim()
      .notEmpty()
      .withMessage('Telegram is required')
      .custom(customValidators.telegramUsername),
    
    body('contactPhone')
      .trim()
      .notEmpty()
      .withMessage('Phone is required')
      .custom(customValidators.russianPhone),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description too long (max 1000 characters)'),
  ]),
};

// Валидаторы для событий
export const eventValidators = {
  create: validateWithLogging([
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Event title is required')
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    
    body('date')
      .isISO8601()
      .withMessage('Invalid date format')
      .custom(customValidators.futureDate),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description too long (max 2000 characters)'),
    
    body('location')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Location too long (max 200 characters)'),
  ]),
};

// Валидаторы для параметров запроса
export const queryValidators = {
  pagination: validateWithLogging([
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
  ]),

  search: validateWithLogging([
    query('search')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Search query must be between 1 and 100 characters'),
    
    query('sortBy')
      .optional()
      .isIn(['createdAt', 'updatedAt', 'name', 'title', 'date'])
      .withMessage('Invalid sort field'),
    
    query('sortOrder')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Sort order must be asc or desc'),
  ]),

  mongoId: validateWithLogging([
    param('id')
      .custom(customValidators.mongoId),
  ]),
};