/**
 * Контроллер для работы с товарами
 * Обрабатывает HTTP запросы и взаимодействует с сервисом товаров
 */

import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import type { ProductFilterQuery } from '../types';

/**
 * Получить список товаров с фильтрацией и пагинацией
 * GET /api/products?categoryId=...&minPrice=...&page=1&limit=12
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: ProductFilterQuery = {
      categoryId: req.query.categoryId as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      brand: req.query.brand as string,
      petType: req.query.petType as string,
      ageGroup: req.query.ageGroup as string,
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      inStock: req.query.inStock === 'true',
      search: req.query.search as string,
      sortBy: req.query.sortBy as 'price' | 'rating' | 'popularity' | 'name',
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 12,
    };

    const result = productService.getProducts(filters);
    res.json(result);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить опции фильтрации
 * GET /api/products/filters
 */
export const getFilterOptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const options = productService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить товар по ID
 * GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = productService.getProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

