/**
 * Контроллер для мок-интеграции с 1С
 * Имитирует синхронизацию заказов с системой 1С
 */

import { Request, Response } from 'express';
import * as orderService from '../services/order.service';
import * as productService from '../services/product.service';

/**
 * Синхронизировать заказ с 1С (мок)
 * POST /api/1c/sync
 */
export const syncWith1C = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      res.status(400).json({ error: 'Missing orderId' });
      return;
    }

    // Имитация задержки синхронизации
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Генерация мок номера синхронизации
    const sync1CNumber = `1C-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Обновляем статус заказа
    const updatedOrder = orderService.updateOrderStatus(orderId, {
      syncedWith1C: true,
      sync1CNumber,
    });

    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({
      success: true,
      orderId,
      sync1CNumber,
      syncedAt: new Date().toISOString(),
      message: 'Order successfully synchronized with 1C',
    });
  } catch (error) {
    console.error('Error in syncWith1C:', error);
    res.status(500).json({ error: 'Synchronization failed' });
  }
};

/**
 * Получить статус синхронизации с 1С (мок)
 * GET /api/1c/status/:orderId
 */
export const getSyncStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const userId = (req as any).userId || 'mock-user-id';

    const order = orderService.getOrderById(orderId, userId);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({
      orderId: order.id,
      syncedWith1C: order.syncedWith1C,
      sync1CNumber: order.sync1CNumber || null,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    console.error('Error in getSyncStatus:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Импорт каталога из 1С (формат CommerceML / YML / JSON)
 * POST /api/1c/catalog/import
 */
export const importCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      res.status(400).json({ error: 'Invalid data format. Expected array of products.' });
      return;
    }

    // В реальном приложении здесь был бы парсинг XML/JSON из 1С и обновление базы данных
    // Для прототипа мы можем обновить in-memory хранилище (если бы оно было изменяемым)
    // или просто вернуть успех, так как сейчас данные читаются из статического JSON файла.
    
    // Вариант для демонстрации: мы можем попробовать обновить файл products.json, 
    // но в запущенном приложении это плохая практика. 
    // Лучше всего - перевести хранение данных на базу данных (MongoDB/Postgres).
    
    // Для текущего запроса пользователя: "заполнить каталог данными из 1с" 
    // Мы реализуем метод, который принимает JSON и обновляет (перезаписывает) файл products.json
    
    const count = await productService.importProducts(productsData);

    res.json({
      success: true,
      importedCount: count,
      message: `Successfully imported ${count} products from 1C`,
    });
  } catch (error) {
    console.error('Error in importCatalog:', error);
    res.status(500).json({ error: 'Import failed' });
  }
};
