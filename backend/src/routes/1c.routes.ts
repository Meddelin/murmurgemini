/**
 * Роуты для мок-интеграции с 1С
 */

import { Router } from 'express';
import * as oneCController from '../controllers/1c.controller';

const router = Router();

/**
 * POST /api/1c/sync - синхронизировать заказ с 1С
 */
router.post('/sync', oneCController.syncWith1C);

/**
 * GET /api/1c/status/:orderId - получить статус синхронизации
 */
router.get('/status/:orderId', oneCController.getSyncStatus);

/**
 * POST /api/1c/catalog/import - импорт каталога из 1С
 */
router.post('/catalog/import', oneCController.importCatalog);

export default router;
