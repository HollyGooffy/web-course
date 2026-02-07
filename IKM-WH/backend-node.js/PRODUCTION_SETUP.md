# Production Setup Guide

## Environment Variables для Production

Создайте файл `.env.production`:

```env
NODE_ENV=production
PORT=3001
MONGO_URI=mongodb://your-production-mongodb-url/festival-app
JWT_SECRET=your-very-secure-jwt-secret-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

## MongoDB Production Setup

### 1. MongoDB Atlas (рекомендуется)

1. Создайте аккаунт на [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Создайте новый кластер
3. Настройте сетевой доступ (IP Whitelist)
4. Создайте пользователя базы данных
5. Получите connection string и добавьте в `MONGO_URI`

Пример connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/festival-app?retryWrites=true&w=majority
```

### 2. Локальная MongoDB (альтернатива)

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# CentOS/RHEL
sudo yum install mongodb-server

# Запуск службы
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Deployment Options

### 1. Heroku

```bash
# Установка Heroku CLI
npm install -g heroku

# Логин
heroku login

# Создание приложения
heroku create your-app-name

# Настройка переменных окружения
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set CORS_ORIGIN=https://your-frontend-domain.com

# Деплой
git push heroku main
```

### 2. DigitalOcean App Platform

1. Подключите GitHub репозиторий
2. Настройте environment variables
3. Выберите план и регион
4. Деплой произойдет автоматически

### 3. AWS EC2

```bash
# Подключение к серверу
ssh -i your-key.pem ubuntu@your-server-ip

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2
sudo npm install -g pm2

# Клонирование репозитория
git clone your-repo-url
cd your-project

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Создание ecosystem файла для PM2
```

Создайте файл `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'festival-api',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

```bash
# Запуск с PM2
pm2 start ecosystem.config.js --env production

# Настройка автозапуска
pm2 startup
pm2 save
```

### 4. Docker

Создайте `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

USER node

CMD ["npm", "start"]
```

Создайте `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/festival-app
      - JWT_SECRET=your-jwt-secret
      - CORS_ORIGIN=https://your-frontend-domain.com
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

```bash
# Сборка и запуск
docker-compose up -d
```

## SSL/HTTPS Setup

### 1. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-api-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-api-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Let's Encrypt (бесплатный SSL)

```bash
# Установка Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-api-domain.com

# Автообновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Мониторинг и Логирование

### 1. PM2 Monitoring

```bash
# Просмотр логов
pm2 logs

# Мониторинг
pm2 monit

# Перезапуск
pm2 restart all
```

### 2. Winston Logger (добавить в проект)

```bash
npm install winston
```

```javascript
// src/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'festival-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## Security Checklist

- [ ] Используйте HTTPS в production
- [ ] Настройте сильный JWT_SECRET
- [ ] Ограничьте CORS origins
- [ ] Настройте rate limiting
- [ ] Используйте Helmet для security headers
- [ ] Регулярно обновляйте зависимости
- [ ] Настройте мониторинг и алерты
- [ ] Сделайте резервные копии базы данных
- [ ] Настройте firewall
- [ ] Используйте environment variables для секретов

## Performance Optimization

- [ ] Включите gzip compression
- [ ] Настройте кэширование
- [ ] Используйте CDN для статических файлов
- [ ] Оптимизируйте MongoDB индексы
- [ ] Настройте connection pooling
- [ ] Используйте кластеризацию (PM2 cluster mode)
- [ ] Мониторьте производительность