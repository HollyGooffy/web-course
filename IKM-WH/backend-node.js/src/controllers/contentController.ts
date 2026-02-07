import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { ContentService } from '../services/contentService';

const contentService = new ContentService();

export class ContentController {
  async getAllContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const content = await contentService.getAllContent();
      res.json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async getContentByKey(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      const content = await contentService.getContentByKey(key);
      if (!content) {
        return res.status(404).json({
          success: false,
          error: 'Content not found',
        });
      }
      res.json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async createContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const content = await contentService.createContent(req.body);
      res.status(201).json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const content = await contentService.updateContent(id, req.body);
      res.json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async upsertContentByKey(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      const content = await contentService.upsertContentByKey(key, req.body);
      res.json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await contentService.deleteContent(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}


