import MerchItem from '../models/MerchItem';
import { createError } from '../utils/errors';

export class MerchService {
  async getAllMerchItems() {
    return await MerchItem.find().sort({ createdAt: -1 });
  }

  async getMerchItemById(id: string) {
    const item = await MerchItem.findById(id);
    if (!item) {
      throw createError('Merch item not found', 404);
    }
    return item;
  }

  async createMerchItem(data: {
    title: string;
    description?: string;
    price: number;
    image?: string;
    stock?: number;
    category?: string;
  }) {
    return await MerchItem.create(data);
  }

  async updateMerchItem(id: string, data: {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    stock?: number;
    category?: string;
  }) {
    const item = await MerchItem.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!item) {
      throw createError('Merch item not found', 404);
    }

    return item;
  }

  async updateStock(id: string, stock: number) {
    const item = await MerchItem.findById(id);
    if (!item) {
      throw createError('Merch item not found', 404);
    }

    item.stock = stock;
    await item.save();

    return item;
  }

  async deleteMerchItem(id: string) {
    const item = await MerchItem.findByIdAndDelete(id);
    if (!item) {
      throw createError('Merch item not found', 404);
    }
    return item;
  }
}


