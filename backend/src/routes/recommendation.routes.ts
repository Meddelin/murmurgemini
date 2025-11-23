/**
 * Роуты для рекомендаций товаров
 * Определяют endpoints для получения персонализированных рекомендаций
 */

import { Router } from 'express';
import * as recommendationController from '../controllers/recommendation.controller';

const router = Router();

/**
 * GET /api/recommendations/:petId - получить рекомендации для питомца
 */
router.get('/:petId', recommendationController.getRecommendations);

export default router;


