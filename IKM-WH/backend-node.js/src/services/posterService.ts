import Poster from '../models/Poster';
import { createError } from '../utils/errors';

export class PosterService {
  async getAllPosters() {
    return await Poster.find().sort({ createdAt: -1 });
  }

  async getPosterById(id: string) {
    const poster = await Poster.findById(id);
    if (!poster) {
      throw createError('Poster not found', 404);
    }
    return poster;
  }

  async createPoster(data: {
    title: string;
    image: string;
    description?: string;
    eventDate?: Date;
    isActive?: boolean;
  }) {
    return await Poster.create(data);
  }

  async updatePoster(id: string, data: {
    title?: string;
    image?: string;
    description?: string;
    eventDate?: Date;
    isActive?: boolean;
  }) {
    const poster = await Poster.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!poster) {
      throw createError('Poster not found', 404);
    }

    return poster;
  }

  async deletePoster(id: string) {
    const poster = await Poster.findByIdAndDelete(id);
    if (!poster) {
      throw createError('Poster not found', 404);
    }
    return poster;
  }
}


