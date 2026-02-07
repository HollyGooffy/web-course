import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/errors';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => {
        // Проверяем тип ошибки и извлекаем нужные поля
        if ('path' in err) {
          return `${err.path}: ${err.msg}`;
        } else if ('param' in err) {
          return `${(err as any).param}: ${err.msg}`;
        } else {
          return err.msg;
        }
      }).join(', ');
      next(createError(errorMessages, 400));
      return;
    }

    next();
  };
};

// Auth validators
export const validateRegister = validate([
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
]);

export const validateLogin = validate([
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
]);

// Application validators
export const validateApplication = validate([
  body('groupName').trim().notEmpty().withMessage('Group name is required'),
  body('contactTelegram')
    .trim()
    .notEmpty()
    .withMessage('Telegram is required')
    .matches(/^@[a-zA-Z0-9_]{5,32}$/)
    .withMessage('Telegram must start with @ and be 5-32 characters'),
  body('contactPhone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^\+7\d{10}$/)
    .withMessage('Phone must start with +7 and contain 10 digits (e.g., +79991234567)'),
]);

// Group validators
export const validateGroup = validate([
  body('name').trim().notEmpty().withMessage('Group name is required'),
]);

// Merch validators
export const validateMerchItem = validate([
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
]);

// Event validators
export const validateEvent = validate([
  body('title').trim().notEmpty().withMessage('Event title is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
]);

// Content validators
export const validateContent = validate([
  body('key').trim().notEmpty().withMessage('Content key is required'),
  body('type').isIn(['text', 'image', 'list']).withMessage('Invalid content type'),
  body('value').notEmpty().withMessage('Content value is required'),
]);


