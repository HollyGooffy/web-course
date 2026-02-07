import { Request, Response } from 'express';
import { eventService } from '../services/eventService';

export const eventController = {
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents();
      res.json({
        success: true,
        data: events,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения событий',
      });
    }
  },

  async getUpcomingEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getUpcomingEvents();
      res.json({
        success: true,
        data: events,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения предстоящих событий',
      });
    }
  },

  async getEventById(req: Request, res: Response) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Событие не найдено',
        });
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения события',
      });
    }
  },

  async createEvent(req: Request, res: Response) {
    try {
      const eventData = {
        ...req.body,
        performers: req.body.performers ? JSON.parse(req.body.performers) : [],
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      };
      
      const event = await eventService.createEvent(eventData);
      res.status(201).json({
        success: true,
        data: event,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка создания события',
      });
    }
  },

  async updateEvent(req: Request, res: Response) {
    try {
      const eventData = {
        ...req.body,
        ...(req.body.performers && { performers: JSON.parse(req.body.performers) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
      };
      
      const event = await eventService.updateEvent(req.params.id, eventData);
      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Событие не найдено',
        });
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления события',
      });
    }
  },

  async deleteEvent(req: Request, res: Response) {
    try {
      const event = await eventService.deleteEvent(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Событие не найдено',
        });
      }
      res.json({
        success: true,
        data: event,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка удаления события',
      });
    }
  },
};

