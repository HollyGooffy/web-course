import { Request, Response } from 'express';
import { MerchService } from '../services/merchService';

const merchService = new MerchService();

export class MerchController {
  async getAllMerchItems(req: Request, res: Response) {
    try {
      const items = await merchService.getAllMerchItems();
      res.json({
        success: true,
        data: items,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения товаров',
      });
    }
  }

  async getMerchItemById(req: Request, res: Response) {
    try {
      const item = await merchService.getMerchItemById(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          error: 'Товар не найден',
        });
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения товара',
      });
    }
  }

  async createMerchItem(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      };
      
      const item = await merchService.createMerchItem(data);
      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка создания товара',
      });
    }
  }

  async updateMerchItem(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
        ...(req.body.price && { price: parseFloat(req.body.price) }),
        ...(req.body.stock && { stock: parseInt(req.body.stock) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
      };
      
      const item = await merchService.updateMerchItem(req.params.id, data);
      if (!item) {
        return res.status(404).json({
          success: false,
          error: 'Товар не найден',
        });
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления товара',
      });
    }
  }

  async updateStock(req: Request, res: Response) {
    try {
      const { stock } = req.body;
      const item = await merchService.updateStock(req.params.id, parseInt(stock));
      if (!item) {
        return res.status(404).json({
          success: false,
          error: 'Товар не найден',
        });
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления остатков',
      });
    }
  }

  async deleteMerchItem(req: Request, res: Response) {
    try {
      const item = await merchService.deleteMerchItem(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          error: 'Товар не найден',
        });
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка удаления товара',
      });
    }
  }
}


