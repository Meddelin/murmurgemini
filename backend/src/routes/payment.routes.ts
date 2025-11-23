/**
 * Роуты для мок-оплаты
 */

import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';

const router = Router();

/**
 * POST /api/payment/yandex-split - оплата через ЯндексСплит
 */
router.post('/yandex-split', paymentController.payWithYandexSplit);

/**
 * POST /api/payment/sbp - оплата через СБП
 */
router.post('/sbp', paymentController.payWithSBP);

/**
 * POST /api/payment/card - оплата картой
 */
router.post('/card', paymentController.payWithCard);

export default router;


