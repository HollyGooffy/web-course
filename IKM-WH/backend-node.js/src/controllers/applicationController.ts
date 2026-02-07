import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { ApplicationService } from '../services/applicationService';
import { ApplicationStatus } from '../types';

const applicationService = new ApplicationService();

export class ApplicationController {
  async createApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const application = await applicationService.createApplication(req.body);
      res.status(201).json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllApplications(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const applications = await applicationService.getAllApplications();
      res.json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const application = await applicationService.getApplicationById(id);
      res.json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateApplicationStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!Object.values(ApplicationStatus).includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status',
        });
      }

      const application = await applicationService.updateApplicationStatus(id, status);
      res.json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const application = await applicationService.updateApplication(id, updateData);
      res.json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await applicationService.deleteApplication(id);
      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}


