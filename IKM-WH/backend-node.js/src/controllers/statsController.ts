import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { StatsService } from '../services/statsService';

const statsService = new StatsService();

export class StatsController {
  async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await statsService.getStats();
      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDashboardStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const [stats, activity] = await Promise.all([
        statsService.getStats(),
        statsService.getActivity()
      ]);
      
      const dashboardData = {
        totalGroups: stats.groups,
        totalEvents: stats.events,
        totalApplications: stats.applications.total,
        totalMerch: stats.merchItems,
        pendingApplications: stats.applications.pending,
        upcomingEvents: stats.upcomingEvents || 0,
        recentActivity: activity.recentApplications.map((app: any) => ({
          id: app._id.toString(),
          action: 'Подана заявка',
          target: app.groupName,
          user: 'Пользователь',
          timestamp: app.createdAt
        }))
      };

      res.json({
        success: true,
        data: dashboardData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getActivity(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const activity = await statsService.getActivity();
      res.json({
        success: true,
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  }
}


