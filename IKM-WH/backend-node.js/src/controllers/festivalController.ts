import { Request, Response } from 'express';
import { FestivalService } from '../services/festivalService';

const festivalService = new FestivalService();

export class FestivalController {
  async getAllFestivals(req: Request, res: Response) {
    try {
      const festivals = await festivalService.getAllFestivals();
      res.json({
        success: true,
        data: festivals,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения фестивалей',
      });
    }
  }

  async getFestivalById(req: Request, res: Response) {
    try {
      const festival = await festivalService.getFestivalById(req.params.id);
      res.json({
        success: true,
        data: festival,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения фестиваля',
      });
    }
  }

  async createFestival(req: Request, res: Response) {
    try {
      const data = {
        name: req.body.name,
        date: new Date(req.body.date),
        venue: req.body.venue,
        description: req.body.description || undefined,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
        time: req.body.time || undefined,
        address: req.body.address || undefined,
        performers: req.body.performers ? JSON.parse(req.body.performers) : undefined,
        status: req.body.status || 'upcoming',
      };
      
      const festival = await festivalService.createFestival(data);
      
      res.status(201).json({
        success: true,
        data: festival,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка создания фестиваля',
      });
    }
  }

  async updateFestival(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        ...(req.body.date && { date: new Date(req.body.date) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
        ...(req.body.performers && { performers: JSON.parse(req.body.performers) }),
        ...(req.body.time !== undefined && { time: req.body.time || undefined }),
        ...(req.body.address !== undefined && { address: req.body.address || undefined }),
      };
      
      const festival = await festivalService.updateFestival(req.params.id, data);
      
      res.json({
        success: true,
        data: festival,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления фестиваля',
      });
    }
  }

  async deleteFestival(req: Request, res: Response) {
    try {
      const festival = await festivalService.deleteFestival(req.params.id);
      res.json({
        success: true,
        data: festival,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка удаления фестиваля',
      });
    }
  }

  async getUpcomingFestivals(req: Request, res: Response) {
    try {
      const festivals = await festivalService.getUpcomingFestivals();
      res.json({
        success: true,
        data: festivals,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения предстоящих фестивалей',
      });
    }
  }

  async getFestivalsWithCards(req: Request, res: Response) {
    try {
      const festivals = await festivalService.getFestivalsWithCards();
      res.json({
        success: true,
        data: festivals,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения фестивалей с карточками',
      });
    }
  }

  async syncWithEvents(req: Request, res: Response) {
    try {
      const festivals = await festivalService.syncWithEvents();
      res.json({
        success: true,
        data: festivals,
        message: `Синхронизировано ${festivals.length} фестивалей с афишей`,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка синхронизации с афишей',
      });
    }
  }
}