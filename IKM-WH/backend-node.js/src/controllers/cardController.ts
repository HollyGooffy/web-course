import { Request, Response } from 'express';
import { CardService } from '../services/cardService';

const cardService = new CardService();

export class CardController {
  async getAllCardSets(req: Request, res: Response) {
    try {
      const cardSets = await cardService.getAllCardSets();
      res.json({
        success: true,
        data: cardSets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения наборов карточек',
      });
    }
  }

  async getPublicCardSets(req: Request, res: Response) {
    try {
      const cardSets = await cardService.getPublicCardSets();
      res.json({
        success: true,
        data: cardSets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения публичных наборов карточек',
      });
    }
  }

  async getCardSetById(req: Request, res: Response) {
    try {
      const cardSet = await cardService.getCardSetById(req.params.id);
      if (!cardSet) {
        return res.status(404).json({
          success: false,
          error: 'Набор карточек не найден',
        });
      }
      res.json({
        success: true,
        data: cardSet,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения набора карточек',
      });
    }
  }

  async createCardSet(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        cardsInSet: parseInt(req.body.cardsInSet),
        setsAvailable: parseInt(req.body.setsAvailable),
        price: parseFloat(req.body.price),
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
        cards: req.body.cards ? JSON.parse(req.body.cards) : [],
      };
      
      const cardSet = await cardService.createCardSet(data);
      
      res.status(201).json({
        success: true,
        data: cardSet,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка создания набора карточек',
      });
    }
  }

  async getCardSetsByFestival(req: Request, res: Response) {
    try {
      const cardSets = await cardService.getCardSetsByFestival(req.params.festivalId);
      res.json({
        success: true,
        data: cardSets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения наборов карточек фестиваля',
      });
    }
  }

  async getPublicCardSetsByFestival(req: Request, res: Response) {
    try {
      const cardSets = await cardService.getPublicCardSetsByFestival(req.params.festivalId);
      res.json({
        success: true,
        data: cardSets,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения публичных наборов карточек фестиваля',
      });
    }
  }

  async updateCardSet(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        ...(req.body.cardsInSet && { cardsInSet: parseInt(req.body.cardsInSet) }),
        ...(req.body.setsAvailable && { setsAvailable: parseInt(req.body.setsAvailable) }),
        ...(req.body.price && { price: parseFloat(req.body.price) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
        ...(req.body.cards && { cards: JSON.parse(req.body.cards) }),
      };
      
      const cardSet = await cardService.updateCardSet(req.params.id, data);
      if (!cardSet) {
        return res.status(404).json({
          success: false,
          error: 'Набор карточек не найден',
        });
      }
      
      res.json({
        success: true,
        data: cardSet,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления набора карточек',
      });
    }
  }

  async deleteCardSet(req: Request, res: Response) {
    try {
      const cardSet = await cardService.deleteCardSet(req.params.id);
      if (!cardSet) {
        return res.status(404).json({
          success: false,
          error: 'Набор карточек не найден',
        });
      }
      res.json({
        success: true,
        data: cardSet,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка удаления набора карточек',
      });
    }
  }
}

