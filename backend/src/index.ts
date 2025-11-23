/**
 * Главный файл сервера Pet Shop Backend
 * Настраивает Express приложение с middleware и роутами
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Импорт роутов (будут созданы позже)
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import petRoutes from './routes/pet.routes';
import orderRoutes from './routes/order.routes';
import recommendationRoutes from './routes/recommendation.routes';
import paymentRoutes from './routes/payment.routes';
import oneСRoutes from './routes/1c.routes';

// Инициализация Express приложения
const app: Application = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware конфигурация
 */

// Безопасность HTTP заголовков
app.use(helmet());

// CORS для взаимодействия с frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Парсинг JSON запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование HTTP запросов
app.use(morgan('dev'));

/**
 * Простой middleware для мок-авторизации
 * Проверяет наличие токена в заголовке Authorization
 */
const mockAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  // Для публичных эндпоинтов пропускаем проверку
  const publicPaths = ['/api/products', '/api/categories'];
  const isPublicPath = publicPaths.some(path => req.path.startsWith(path));
  
  if (isPublicPath || authHeader) {
    // Добавляем мок userId в request для использования в контроллерах
    if (authHeader) {
      (req as any).userId = 'mock-user-id';
    }
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * API роуты
 */
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/pets', mockAuthMiddleware, petRoutes);
app.use('/api/orders', mockAuthMiddleware, orderRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/payment', mockAuthMiddleware, paymentRoutes);
app.use('/api/1c', oneСRoutes);

/**
 * Базовый роут для проверки работы сервера
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Pet Shop API Server',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      pets: '/api/pets',
      orders: '/api/orders',
      recommendations: '/api/recommendations/:petId',
      payment: '/api/payment',
      oneC: '/api/1c'
    }
  });
});

/**
 * Health check эндпоинт
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * 404 обработчик
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

/**
 * Глобальный обработчик ошибок
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

/**
 * Запуск сервера
 */
app.listen(PORT, () => {
  console.log(`🚀 Pet Shop Backend запущен на порту ${PORT}`);
  console.log(`📝 Документация API: http://localhost:${PORT}/`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;


