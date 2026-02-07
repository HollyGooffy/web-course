import logger from '../utils/logger';

interface CacheItem<T> {
  data: T;
  expires: number;
  created: number;
}

export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 300; // 5 минут по умолчанию
  private maxSize = 1000; // Максимальное количество элементов в кэше
  private cleanupInterval: NodeJS.Timeout;

  constructor(defaultTTL: number = 300, maxSize: number = 1000) {
    this.defaultTTL = defaultTTL;
    this.maxSize = maxSize;
    
    // Запускаем очистку кэша каждые 5 минут
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);

    logger.info('CacheService initialized', { defaultTTL, maxSize });
  }

  // Получить значение из кэша
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      logger.debug('Cache miss', { key });
      return null;
    }

    const now = Date.now();
    if (item.expires < now) {
      this.cache.delete(key);
      logger.debug('Cache expired', { key });
      return null;
    }

    logger.debug('Cache hit', { key });
    return item.data;
  }

  // Сохранить значение в кэш
  set<T>(key: string, data: T, ttlSeconds?: number): void {
    const ttl = ttlSeconds || this.defaultTTL;
    const now = Date.now();
    
    // Проверяем размер кэша
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }

    const item: CacheItem<T> = {
      data,
      expires: now + (ttl * 1000),
      created: now
    };

    this.cache.set(key, item);
    logger.debug('Cache set', { key, ttl });
  }

  // Удалить значение из кэша
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      logger.debug('Cache deleted', { key });
    }
    return deleted;
  }

  // Проверить существование ключа
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (item.expires < now) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  // Очистить весь кэш
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    logger.info('Cache cleared', { previousSize: size });
  }

  // Получить статистику кэша
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    memoryUsage: string;
  } {
    const memoryUsage = this.estimateMemoryUsage();
    
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // TODO: Реализовать подсчет hit rate
      memoryUsage: this.formatBytes(memoryUsage)
    };
  }

  // Получить или установить значение (с функцией-генератором)
  async getOrSet<T>(
    key: string,
    generator: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    logger.debug('Cache miss, generating value', { key });
    const data = await generator();
    this.set(key, data, ttlSeconds);
    
    return data;
  }

  // Инвалидация по паттерну
  invalidatePattern(pattern: string): number {
    const regex = new RegExp(pattern);
    let deleted = 0;

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        deleted++;
      }
    }

    logger.info('Cache pattern invalidated', { pattern, deleted });
    return deleted;
  }

  // Установить TTL для существующего ключа
  expire(key: string, ttlSeconds: number): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    item.expires = Date.now() + (ttlSeconds * 1000);
    logger.debug('Cache TTL updated', { key, ttl: ttlSeconds });
    return true;
  }

  // Получить TTL для ключа
  getTTL(key: string): number {
    const item = this.cache.get(key);
    if (!item) return -1;

    const now = Date.now();
    const ttl = Math.max(0, Math.floor((item.expires - now) / 1000));
    return ttl;
  }

  // Очистка просроченных элементов
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (item.expires < now) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.debug('Cache cleanup completed', { cleaned, remaining: this.cache.size });
    }
  }

  // Удаление самого старого элемента
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.created < oldestTime) {
        oldestTime = item.created;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      logger.debug('Cache evicted oldest item', { key: oldestKey });
    }
  }

  // Оценка использования памяти
  private estimateMemoryUsage(): number {
    let size = 0;
    
    for (const [key, item] of this.cache.entries()) {
      size += key.length * 2; // UTF-16
      size += JSON.stringify(item.data).length * 2;
      size += 24; // Примерный размер метаданных
    }

    return size;
  }

  // Форматирование размера в байтах
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Уничтожение сервиса
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
    logger.info('CacheService destroyed');
  }
}

// Глобальный экземпляр кэша
export const cacheService = new CacheService();

// Декоратор для кэширования методов
export function CacheMethod(ttlSeconds: number = 300, keyGenerator?: (...args: any[]) => string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const defaultKey = `${className}.${propertyName}:${JSON.stringify(args)}`;
      const cacheKey = keyGenerator ? keyGenerator(...args) : defaultKey;

      return await cacheService.getOrSet(
        cacheKey,
        () => method.apply(this, args),
        ttlSeconds
      );
    };
  };
}