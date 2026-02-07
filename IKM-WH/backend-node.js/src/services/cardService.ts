import CardSet from '../models/CardSet';
import { createError } from '../utils/errors';

export class CardService {
  async getAllCardSets() {
    return await CardSet.find().populate('festivalId').sort({ createdAt: -1 });
  }

  async getPublicCardSets() {
    return await CardSet.find().populate('festivalId').sort({ createdAt: -1 });
  }

  async getCardSetsByFestival(festivalId: string) {
    return await CardSet.find({ festivalId }).populate('festivalId').sort({ createdAt: -1 });
  }

  async getPublicCardSetsByFestival(festivalId: string) {
    return await CardSet.find({ festivalId }).populate('festivalId').sort({ createdAt: -1 });
  }

  async getCardSetById(id: string) {
    const cardSet = await CardSet.findById(id).populate('festivalId');
    if (!cardSet) {
      throw createError('Card set not found', 404);
    }
    return cardSet;
  }

  async createCardSet(data: {
    title: string;
    festivalId: string;
    cardsInSet: number;
    setsAvailable: number;
    price: number;
    image?: string;
    cards?: Array<{
      name: string;
      image?: string;
      description?: string;
    }>;
  }) {
    const cardSet = await CardSet.create(data);
    return await CardSet.findById(cardSet._id).populate('festivalId');
  }

  async updateCardSet(id: string, data: {
    title?: string;
    festivalId?: string;
    cardsInSet?: number;
    setsAvailable?: number;
    price?: number;
    image?: string;
    cards?: Array<{
      name: string;
      image?: string;
      description?: string;
    }>;
  }) {
    const cardSet = await CardSet.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).populate('festivalId');

    if (!cardSet) {
      throw createError('Card set not found', 404);
    }

    return cardSet;
  }

  async deleteCardSet(id: string) {
    const cardSet = await CardSet.findByIdAndDelete(id);
    if (!cardSet) {
      throw createError('Card set not found', 404);
    }
    return cardSet;
  }
}
