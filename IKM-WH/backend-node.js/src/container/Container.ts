type Constructor<T = {}> = new (...args: any[]) => T;
type ServiceFactory<T> = () => T;

export class Container {
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  // Регистрация сервиса как singleton
  registerSingleton<T>(token: string, implementation: Constructor<T> | ServiceFactory<T>): void {
    this.services.set(token, { type: 'singleton', implementation });
  }

  // Регистрация обычного сервиса
  register<T>(token: string, implementation: Constructor<T> | ServiceFactory<T>): void {
    this.services.set(token, { type: 'transient', implementation });
  }

  // Получение сервиса
  get<T>(token: string): T {
    const service = this.services.get(token);
    if (!service) {
      throw new Error(`Service ${token} not found`);
    }

    if (service.type === 'singleton') {
      if (!this.singletons.has(token)) {
        const instance = this.createInstance(service.implementation);
        this.singletons.set(token, instance);
      }
      return this.singletons.get(token);
    }

    return this.createInstance(service.implementation);
  }

  private createInstance<T>(implementation: Constructor<T> | ServiceFactory<T>): T {
    if (typeof implementation === 'function' && implementation.prototype) {
      // Constructor
      return new (implementation as Constructor<T>)();
    } else {
      // Factory function
      return (implementation as ServiceFactory<T>)();
    }
  }

  // Очистка контейнера (для тестов)
  clear(): void {
    this.services.clear();
    this.singletons.clear();
  }
}

// Глобальный контейнер
export const container = new Container();

// Токены для сервисов
export const TOKENS = {
  AUTH_SERVICE: 'AuthService',
  USER_SERVICE: 'UserService',
  FESTIVAL_SERVICE: 'FestivalService',
  EVENT_SERVICE: 'EventService',
  // Добавляйте новые токены здесь
} as const;