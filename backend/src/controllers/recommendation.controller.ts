/**
 * Контроллер рекомендаций товаров
 * Обрабатывает запросы на получение персонализированных рекомендаций
 */

import { Request, Response } from 'express';
import * as recommendationService from '../services/recommendation.service';

/**
 * Получить рекомендации товаров для питомца
 * GET /api/recommendations/:petId
 */
export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId } = req.params;
    const userId = (req as any).userId || 'mock-user-id';

    const recommendations = recommendationService.getRecommendationsForPet(petId, userId);

    if (recommendations.length === 0) {
      res.status(404).json({ error: 'Pet not found or no recommendations available' });
      return;
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


