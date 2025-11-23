/**
 * Роуты для работы с категориями товаров
 * Определяют endpoints для получения информации о категориях
 */

import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';

const router = Router();

/**
 * GET /api/categories - получить все категории
 */
router.get('/', categoryController.getCategories);

/**
 * GET /api/categories/:id - получить категорию по ID
 */
router.get('/:id', categoryController.getCategoryById);

export default router;


