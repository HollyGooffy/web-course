import FestivalContent from '../models/FestivalContent';
import { ContentType } from '../types';
import { createError } from '../utils/errors';

export class ContentService {
  async getAllContent() {
    return await FestivalContent.find().sort({ updatedAt: -1 });
  }

  async getContentByKey(key: string) {
    const content = await FestivalContent.findOne({ key });
    return content;
  }

  async createContent(data: {
    type: ContentType;
    key: string;
    value: string | string[] | Record<string, any>;
  }) {
    return await FestivalContent.create(data);
  }

  async updateContent(id: string, data: {
    type?: ContentType;
    key?: string;
    value?: string | string[] | Record<string, any>;
  }) {
    const content = await FestivalContent.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!content) {
      throw createError('Content not found', 404);
    }

    return content;
  }

  async upsertContentByKey(key: string, data: {
    type: ContentType;
    value: string | string[] | Record<string, any>;
  }) {
    return await FestivalContent.findOneAndUpdate(
      { key },
      { $set: { ...data, key } },
      { new: true, upsert: true, runValidators: true }
    );
  }

  async deleteContent(id: string) {
    const content = await FestivalContent.findByIdAndDelete(id);
    if (!content) {
      throw createError('Content not found', 404);
    }
    return content;
  }
}


