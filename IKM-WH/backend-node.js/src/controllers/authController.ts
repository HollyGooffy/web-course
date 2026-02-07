import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { AuthService } from '../services/authService';
import { BaseController } from './BaseController';
import { RequireAuth } from '../decorators';

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const { email, password, name } = req.body;
        return await this.authService.register(email, password, name);
      },
      `User registered successfully: ${req.body.email}`,
      201
    );
  }

  async login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const { email, password } = req.body;
        return await this.authService.login(email, password);
      },
      `User logged in: ${req.body.email}`
    );
  }

  @RequireAuth
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        return await this.authService.getProfile(req.user!.id);
      },
      'Profile retrieved successfully'
    );
  }

  @RequireAuth
  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const { name, email } = req.body;
        return await this.authService.updateProfile(req.user!.id, { name, email });
      },
      'Profile updated successfully'
    );
  }

  @RequireAuth
  async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const { currentPassword, newPassword } = req.body;
        return await this.authService.changePassword(req.user!.id, currentPassword, newPassword);
      },
      'Password changed successfully'
    );
  }

  @RequireAuth
  async validateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const user = await this.authService.getProfile(req.user!.id);
        return {
          user,
          message: 'Token is valid',
        };
      },
      'Token validated successfully'
    );
  }

  @RequireAuth
  async getUserStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        return await this.authService.getUserStats();
      },
      'User statistics retrieved successfully'
    );
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        // В JWT токенах логаут обычно происходит на клиенте
        // Здесь можно добавить логику для blacklist токенов если нужно
        return { message: 'Logged out successfully' };
      },
      'User logged out successfully'
    );
  }
}

