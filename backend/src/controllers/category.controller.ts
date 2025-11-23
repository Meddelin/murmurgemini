/**
 * Контроллер для работы с категориями товаров
 * Обрабатывает HTTP запросы для получения категорий
 */

import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';

/**
 * Получить все категории
 * GET /api/categories
 */
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить категорию по ID
 * GET /api/categories/:id
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = categoryService.getCategoryById(id);

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error) {
    console.error('Error in getCategoryById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


