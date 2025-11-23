/**
 * Сервис для работы с категориями товаров
 * Содержит бизнес-логику для получения категорий из JSON данных
 */

import categoriesData from '../data/categories.json';
import type { Category } from '../types';

/**
 * Получить все категории
 */
export const getCategories = (): Category[] => {
  return categoriesData as Category[];
};

/**
 * Получить категорию по ID
 */
export const getCategoryById = (id: string): Category | undefined => {
  return categoriesData.find((c) => c.id === id) as Category | undefined;
};

/**
 * Получить категорию по slug
 */
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categoriesData.find((c) => c.slug === slug) as Category | undefined;
};


