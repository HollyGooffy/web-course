import { Document, Model, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { createError } from '../utils/errors';
import logger from '../utils/logger';
import { LogMethod, Cache } from '../decorators';

export interface IRepository<T extends Document> {
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findMany(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, data: UpdateQuery<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  exists(filter: FilterQuery<T>): Promise<boolean>;
  count(filter: FilterQuery<T>): Promise<number>;
}

export abstract class BaseRepository<T extends Document> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  @LogMethod()
  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      logger.error(`Error finding ${this.model.modelName} by id`, { id, error });
      throw error;
    }
  }

  @LogMethod()
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    try {
      return await this.model.findOne(filter).exec();
    } catch (error) {
      logger.error(`Error finding ${this.model.modelName}`, { filter, error });
      throw error;
    }
  }

  @LogMethod()
  async findMany(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    try {
      return await this.model.find(filter, null, options).exec();
    } catch (error) {
      logger.error(`Error finding multiple ${this.model.modelName}`, { filter, options, error });
      throw error;
    }
  }

  @LogMethod()
  async create(data: Partial<T>): Promise<T> {
    try {
      const document = await this.model.create(data);
      logger.info(`${this.model.modelName} created`, { id: document._id });
      return document;
    } catch (error) {
      logger.error(`Error creating ${this.model.modelName}`, { data, error });
      throw error;
    }
  }

  @LogMethod()
  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      const document = await this.model.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      ).exec();
      
      if (document) {
        logger.info(`${this.model.modelName} updated`, { id });
      }
      
      return document;
    } catch (error) {
      logger.error(`Error updating ${this.model.modelName}`, { id, data, error });
      throw error;
    }
  }

  @LogMethod()
  async deleteById(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();
      if (result) {
        logger.info(`${this.model.modelName} deleted`, { id });
        return true;
      }
      return false;
    } catch (error) {
      logger.error(`Error deleting ${this.model.modelName}`, { id, error });
      throw error;
    }
  }

  @Cache(60) // Кэшируем на 1 минуту
  async exists(filter: FilterQuery<T>): Promise<boolean> {
    try {
      const count = await this.model.countDocuments(filter).exec();
      return count > 0;
    } catch (error) {
      logger.error(`Error checking ${this.model.modelName} existence`, { filter, error });
      throw error;
    }
  }

  @Cache(30) // Кэшируем на 30 секунд
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    try {
      return await this.model.countDocuments(filter).exec();
    } catch (error) {
      logger.error(`Error counting ${this.model.modelName}`, { filter, error });
      throw error;
    }
  }

  // Пагинация с кэшированием
  @Cache(60)
  async findWithPagination(
    filter: FilterQuery<T> = {},
    page: number = 1,
    limit: number = 10,
    sort: any = { createdAt: -1 }
  ) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.model.find(filter).sort(sort).skip(skip).limit(limit).exec(),
        this.model.countDocuments(filter).exec()
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Error finding ${this.model.modelName} with pagination`, { 
        filter, page, limit, sort, error 
      });
      throw error;
    }
  }

  // Поиск с текстовым запросом
  async search(
    searchQuery: string,
    searchFields: string[],
    filter: FilterQuery<T> = {},
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const searchRegex = new RegExp(searchQuery, 'i');
      const searchConditions = searchFields.map(field => ({
        [field]: searchRegex
      }));

      const combinedFilter = {
        ...filter,
        $or: searchConditions
      };

      return await this.findWithPagination(combinedFilter, page, limit);
    } catch (error) {
      logger.error(`Error searching ${this.model.modelName}`, { 
        searchQuery, searchFields, filter, error 
      });
      throw error;
    }
  }

  // Транзакция
  async withTransaction<R>(operation: (session: any) => Promise<R>): Promise<R> {
    const session = await this.model.db.startSession();
    session.startTransaction();

    try {
      const result = await operation(session);
      await session.commitTransaction();
      logger.info(`Transaction completed for ${this.model.modelName}`);
      return result;
    } catch (error) {
      await session.abortTransaction();
      logger.error(`Transaction failed for ${this.model.modelName}`, { error });
      throw error;
    } finally {
      session.endSession();
    }
  }
}