import { Request, Response } from 'express';
import { GroupService } from '../services/groupService';

const groupService = new GroupService();

export class GroupController {
  async getAllGroups(req: Request, res: Response) {
    try {
      const groups = await groupService.getAllGroups();
      res.json({
        success: true,
        data: groups,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения групп',
      });
    }
  }

  async getGroupById(req: Request, res: Response) {
    try {
      const group = await groupService.getGroupById(req.params.id);
      if (!group) {
        return res.status(404).json({
          success: false,
          error: 'Группа не найдена',
        });
      }
      res.json({
        success: true,
        data: group,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка получения группы',
      });
    }
  }

  async createGroup(req: Request, res: Response) {
    try {
      const groupData = {
        ...req.body,
        members: req.body.members ? JSON.parse(req.body.members) : [],
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      };
      
      const group = await groupService.createGroup(groupData);
      res.status(201).json({
        success: true,
        data: group,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка создания группы',
      });
    }
  }

  async updateGroup(req: Request, res: Response) {
    try {
      const groupData = {
        ...req.body,
        ...(req.body.members && { members: JSON.parse(req.body.members) }),
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
      };
      
      const group = await groupService.updateGroup(req.params.id, groupData);
      if (!group) {
        return res.status(404).json({
          success: false,
          error: 'Группа не найдена',
        });
      }
      res.json({
        success: true,
        data: group,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Ошибка обновления группы',
      });
    }
  }

  async deleteGroup(req: Request, res: Response) {
    try {
      const group = await groupService.deleteGroup(req.params.id);
      if (!group) {
        return res.status(404).json({
          success: false,
          error: 'Группа не найдена',
        });
      }
      res.json({
        success: true,
        data: group,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Ошибка удаления группы',
      });
    }
  }
}

