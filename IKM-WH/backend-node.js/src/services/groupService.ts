import Group from '../models/Group';
import { createError } from '../utils/errors';

export class GroupService {
  async getAllGroups() {
    return await Group.find().sort({ createdAt: -1 });
  }

  async getGroupById(id: string) {
    const group = await Group.findById(id);
    if (!group) {
      throw createError('Group not found', 404);
    }
    return group;
  }

  async createGroup(data: {
    name: string;
    genre?: string;
    description?: string;
    members?: string[];
    image?: string;
    socialLinks?: any;
  }) {
    return await Group.create(data);
  }

  async updateGroup(id: string, data: {
    name?: string;
    genre?: string;
    description?: string;
    members?: string[];
    image?: string;
    vkLink?: string;
    tgLink?: string;
    socialLinks?: any;
  }) {
    const group = await Group.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: false } // Отключаем валидацию для частичного обновления
    );

    if (!group) {
      throw createError('Group not found', 404);
    }

    return group;
  }

  async deleteGroup(id: string) {
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      throw createError('Group not found', 404);
    }
    return group;
  }
}


