/**
 * Роуты для работы с заказами
 */

import { Router } from 'express';
import * as orderController from '../controllers/order.controller';

const router = Router();

/**
 * GET /api/orders - получить все заказы пользователя
 */
router.get('/', orderController.getUserOrders);

/**
 * POST /api/orders - создать новый заказ
 */
router.post('/', orderController.createOrder);

/**
 * GET /api/orders/:id - получить заказ по ID
 */
router.get('/:id', orderController.getOrderById);

export default router;


