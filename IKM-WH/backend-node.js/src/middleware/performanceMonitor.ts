import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface PerformanceMetrics {
  requestCount: number;
  totalResponseTime: number;
  averageResponseTime: number;
  slowRequests: number;
  errorCount: number;
  requestsByEndpoint: Map<string, {
    count: number;
    totalTime: number;
    averageTime: number;
    errors: number;
  }>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    requestCount: 0,
    totalResponseTime: 0,
    averageResponseTime: 0,
    slowRequests: 0,
    errorCount: 0,
    requestsByEndpoint: new Map(),
  };

  private slowRequestThreshold = 1000; // 1 секунда
  private reportInterval = 60000; // 1 минута
  private reportTimer: NodeJS.Timeout;

  constructor() {
    // Периодический отчет о производительности
    this.reportTimer = setInterval(() => {
      this.generateReport();
    }, this.reportInterval);

    logger.info('PerformanceMonitor initialized', {
      slowRequestThreshold: this.slowRequestThreshold,
      reportInterval: this.reportInterval
    });
  }

  middleware = (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();
    const endpoint = `${req.method} ${req.route?.path || req.path}`;
    const self = this;

    // Перехватываем завершение ответа
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any) {
      const responseTime = Date.now() - startTime;
      
      // Обновляем метрики
      self.updateMetrics(endpoint, responseTime, res.statusCode >= 400);
      
      // Логируем медленные запросы
      if (responseTime > self.slowRequestThreshold) {
        logger.warn('Slow request detected', {
          method: req.method,
          path: req.path,
          responseTime: `${responseTime}ms`,
          statusCode: res.statusCode,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
      }

      return originalEnd.call(this, chunk, encoding);
    };

    next();
  };

  private updateMetrics(endpoint: string, responseTime: number, isError: boolean): void {
    // Общие метрики
    this.metrics.requestCount++;
    this.metrics.totalResponseTime += responseTime;
    this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.requestCount;

    if (responseTime > this.slowRequestThreshold) {
      this.metrics.slowRequests++;
    }

    if (isError) {
      this.metrics.errorCount++;
    }

    // Метрики по эндпоинтам
    const endpointStats = this.metrics.requestsByEndpoint.get(endpoint) || {
      count: 0,
      totalTime: 0,
      averageTime: 0,
      errors: 0
    };

    endpointStats.count++;
    endpointStats.totalTime += responseTime;
    endpointStats.averageTime = endpointStats.totalTime / endpointStats.count;

    if (isError) {
      endpointStats.errors++;
    }

    this.metrics.requestsByEndpoint.set(endpoint, endpointStats);
  }

  private generateReport(): void {
    if (this.metrics.requestCount === 0) return;

    const report = {
      period: `${this.reportInterval / 1000}s`,
      totalRequests: this.metrics.requestCount,
      averageResponseTime: Math.round(this.metrics.averageResponseTime),
      slowRequests: this.metrics.slowRequests,
      errorRate: ((this.metrics.errorCount / this.metrics.requestCount) * 100).toFixed(2) + '%',
      topEndpoints: this.getTopEndpoints(5),
      slowestEndpoints: this.getSlowestEndpoints(3),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    };

    logger.info('Performance Report', report);

    // Сброс метрик для следующего периода
    this.resetMetrics();
  }

  private getTopEndpoints(limit: number): Array<{endpoint: string, count: number, averageTime: number}> {
    return Array.from(this.metrics.requestsByEndpoint.entries())
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, limit)
      .map(([endpoint, stats]) => ({
        endpoint,
        count: stats.count,
        averageTime: Math.round(stats.averageTime)
      }));
  }

  private getSlowestEndpoints(limit: number): Array<{endpoint: string, averageTime: number, count: number}> {
    return Array.from(this.metrics.requestsByEndpoint.entries())
      .sort(([,a], [,b]) => b.averageTime - a.averageTime)
      .slice(0, limit)
      .map(([endpoint, stats]) => ({
        endpoint,
        averageTime: Math.round(stats.averageTime),
        count: stats.count
      }));
  }

  private resetMetrics(): void {
    this.metrics = {
      requestCount: 0,
      totalResponseTime: 0,
      averageResponseTime: 0,
      slowRequests: 0,
      errorCount: 0,
      requestsByEndpoint: new Map(),
    };
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  setSlowRequestThreshold(threshold: number): void {
    this.slowRequestThreshold = threshold;
    logger.info('Slow request threshold updated', { threshold });
  }

  destroy(): void {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
    }
    logger.info('PerformanceMonitor destroyed');
  }
}

export const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor;