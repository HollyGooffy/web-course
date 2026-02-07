import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { PosterService } from '../services/posterService';

const posterService = new PosterService();

export class PosterController {
  async getAllPosters(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const posters = await posterService.getAllPosters();
      res.json({
        success: true,
        data: posters,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPosterById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const poster = await posterService.getPosterById(id);
      res.json({
        success: true,
        data: poster,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPoster(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Image is required',
        });
      }

      const data = {
        ...req.body,
        image: `/uploads/${req.file.filename}`,
        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : undefined,
      };
      const poster = await posterService.createPoster(data);
      res.status(201).json({
        success: true,
        data: poster,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePoster(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = {
        ...req.body,
        image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
        eventDate: req.body.eventDate ? new Date(req.body.eventDate) : undefined,
      };
      const poster = await posterService.updatePoster(id, data);
      res.json({
        success: true,
        data: poster,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePoster(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await posterService.deletePoster(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}


