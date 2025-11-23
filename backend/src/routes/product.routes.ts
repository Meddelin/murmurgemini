/**
 * Роуты для работы с товарами
 * Определяют endpoints для получения информации о товарах
 */

import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

/**
 * GET /api/products - получить список товаров с фильтрацией
 */
router.get('/', productController.getProducts);

/**
 * GET /api/products/filters - получить опции фильтрации
 */
router.get('/filters', productController.getFilterOptions);

/**
 * GET /api/products/:id - получить товар по ID
 */
router.get('/:id', productController.getProductById);

export default router;

