import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/errors';
import { JWTPayload } from '../types';
import logger from '../utils/logger';
import config from '../config';
import { UserRepository } from '../repositories/UserRepository';
import { LogMethod, Retry } from '../decorators';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  @LogMethod('User registration')
  @Retry(2, 500)
  async register(email: string, password: string, name: string) {
    logger.info('User registration attempt', { email });

    // Проверяем существование пользователя
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      logger.warn('Registration failed: email already exists', { email });
      throw createError('User with this email already exists', 400);
    }

    // Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
    
    // Создаем пользователя через repository
    const user = await this.userRepository.createUser({
      email,
      passwordHash,
      name,
      role: 'admin',
    });

    // Генерируем токен
    const token = this.generateToken(user._id.toString(), user.email, user.role);

    logger.info('User registered successfully', { 
      userId: user._id, 
      email: user.email 
    });

    return {
      user: user.toJSON(),
      token,
    };
  }

  @LogMethod('User login')
  async login(email: string, password: string) {
    logger.info('User login attempt', { email });

    // Находим пользователя через repository
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      logger.warn('Login failed: user not found', { email });
      throw createError('Invalid email or password', 401);
    }

    // Проверяем пароль
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn('Login failed: invalid password', { email });
      throw createError('Invalid email or password', 401);
    }

    // Генерируем токен
    const token = this.generateToken(user._id.toString(), user.email, user.role);

    logger.info('User logged in successfully', { 
      userId: user._id, 
      email: user.email 
    });

    return {
      user: user.toJSON(),
      token,
    };
  }

  @LogMethod('Get user profile')
  async getProfile(userId: string) {
    logger.debug('Getting user profile', { userId });

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.warn('Profile request failed: user not found', { userId });
      throw createError('User not found', 404);
    }

    return user.toJSON();
  }

  @LogMethod('Update user profile')
  async updateProfile(userId: string, profileData: {
    name?: string;
    email?: string;
  }) {
    logger.info('Updating user profile', { userId, fields: Object.keys(profileData) });

    // Проверяем email на уникальность если он изменяется
    if (profileData.email) {
      const emailTaken = await this.userRepository.isEmailTaken(profileData.email, userId);
      if (emailTaken) {
        throw createError('Email already in use', 400);
      }
    }

    const updatedUser = await this.userRepository.updateProfile(userId, profileData);
    if (!updatedUser) {
      throw createError('User not found', 404);
    }

    logger.info('User profile updated successfully', { userId });
    return updatedUser.toJSON();
  }

  @LogMethod('Change password')
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    logger.info('Password change attempt', { userId });

    // Находим пользователя
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    // Проверяем текущий пароль
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      logger.warn('Password change failed: invalid current password', { userId });
      throw createError('Current password is incorrect', 400);
    }

    // Хэшируем новый пароль
    const newPasswordHash = await bcrypt.hash(newPassword, config.bcryptRounds);
    
    // Обновляем пароль
    await this.userRepository.updatePassword(userId, newPasswordHash);

    logger.info('Password changed successfully', { userId });
    return { message: 'Password changed successfully' };
  }

  @LogMethod('Get user statistics')
  async getUserStats() {
    return await this.userRepository.getUserStats();
  }

  private generateToken(id: string, email: string, role: string): string {
    if (!config.jwtSecret) {
      logger.error('JWT secret not configured');
      throw createError('JWT secret not configured', 500);
    }

    const payload: JWTPayload = {
      id,
      email,
      role,
    };

    logger.debug('Generating JWT token', { userId: id });
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as jwt.SignOptions);
  }
}

