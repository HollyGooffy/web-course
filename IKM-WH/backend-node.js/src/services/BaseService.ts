import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';
import { createError } from '../utils/errors';
import logger from '../utils/logger';

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export interface SearchOptions {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T> {
    const document = await this.model.findById(id);
    if (!document) {
      throw createError(`${this.model.modelName} not found`, 404);
    }
    return document;
  }

  async findAll(
    filter: FilterQuery<T> = {},
    pagination?: PaginationOptions,
    search?: SearchOptions
  ): Promise<PaginatedResult<T> | T[]> {
    let query = this.model.find(filter);

    // Apply search if provided
    if (search?.search && this.getSearchFields().length > 0) {
      const searchRegex = new RegExp(search.search, 'i');
      const searchConditions = this.getSearchFields().map(field => ({
        [field]: searchRegex
      }));
      query = query.or(searchConditions);
    }

    // Apply sorting
    if (search?.sortBy) {
      const sortOrder = search.sortOrder === 'asc' ? 1 : -1;
      query = query.sort({ [search.sortBy]: sortOrder });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    // If no pagination, return all results
    if (!pagination) {
      return await query.exec();
    }

    // Apply pagination
    const total = await this.model.countDocuments(query.getFilter());
    const data = await query.skip(pagination.skip).limit(pagination.limit).exec();

    return {
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const document = await this.model.create(data);
      logger.info(`${this.model.modelName} created`, { id: document._id });
      return document;
    } catch (error) {
      logger.error(`Failed to create ${this.model.modelName}`, { error, data });
      throw error;
    }
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T> {
    const document = await this.model.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!document) {
      throw createError(`${this.model.modelName} not found`, 404);
    }

    logger.info(`${this.model.modelName} updated`, { id });
    return document;
  }

  async deleteById(id: string): Promise<void> {
    const document = await this.model.findByIdAndDelete(id);
    if (!document) {
      throw createError(`${this.model.modelName} not found`, 404);
    }
    logger.info(`${this.model.modelName} deleted`, { id });
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(filter);
    return count > 0;
  }

  // Override this method in child classes to define searchable fields
  protected getSearchFields(): string[] {
    return [];
  }
}