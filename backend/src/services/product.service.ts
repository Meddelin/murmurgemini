/**
 * Сервис для работы с товарами
 * Содержит бизнес-логику для получения и фильтрации товаров из JSON данных
 */

import productsDataJson from '../data/products.json';
import type { Product, ProductFilterQuery, ProductListResponse } from '../types';
import fs from 'fs/promises';
import path from 'path';

// Инициализируем хранилище в памяти из JSON файла
let productsData: Product[] = [...(productsDataJson as Product[])];

/**
 * Получить список товаров с фильтрацией, сортировкой и пагинацией
 */
export const getProducts = (filters: ProductFilterQuery): ProductListResponse => {
  let filteredProducts = [...productsData];

  // Применяем фильтры
  if (filters.categoryId) {
    filteredProducts = filteredProducts.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === filters.brand);
  }

  if (filters.petType) {
    filteredProducts = filteredProducts.filter(
      (p) => p.petType === filters.petType || p.petType === 'all'
    );
  }

  if (filters.ageGroup) {
    filteredProducts = filteredProducts.filter(
      (p) => p.ageGroup === filters.ageGroup || p.ageGroup === 'all'
    );
  }

  if (filters.minRating !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters.inStock) {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  }

  // Поиск по названию и описанию
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
    );
  }

  // Сортировка
  const sortBy = filters.sortBy || 'popularity';
  const sortOrder = filters.sortOrder || 'desc';

  filteredProducts.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'popularity':
      default:
        // Сортировка по популярности (количество отзывов)
        comparison = a.reviewCount - b.reviewCount;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Пагинация
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);

  return {
    products: paginatedProducts as Product[],
    total,
    page,
    limit,
    totalPages,
  };
};

/**
 * Получить товар по ID
 */
export const getProductById = (id: string): Product | undefined => {
  return productsData.find((p) => p.id === id) as Product | undefined;
};

/**
 * Получить все бренды из товаров
 */
export const getAllBrands = (): string[] => {
  const brands = new Set(productsData.map((p) => p.brand));
  return Array.from(brands).sort();
};

/**
 * Получить опции для фильтров (диапазон цен, бренды)
 */
export const getFilterOptions = () => {
  const brands = getAllBrands();
  
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  productsData.forEach((p) => {
    if (p.price < minPrice) minPrice = p.price;
    if (p.price > maxPrice) maxPrice = p.price;
  });

  // Если товаров нет, устанавливаем дефолтные значения
  if (minPrice === Infinity) minPrice = 0;
  if (maxPrice === -Infinity) maxPrice = 0;

  return {
    brands,
    minPrice,
    maxPrice,
  };
};

/**
 * Импортировать товары (обновление каталога)
 * В режиме разработки обновляет JSON файл
 */
export const importProducts = async (newProducts: any[]): Promise<number> => {
  // Валидация и маппинг входящих данных
  // В реальности здесь была бы сложная логика сопоставления полей
  // Для упрощения считаем, что нам присылают массив объектов Product
  
  const importedProducts: Product[] = newProducts.map((p: any) => ({
    id: p.id || `imported-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    name: p.name || 'Без названия',
    description: p.description || '',
    price: typeof p.price === 'number' ? p.price : 0,
    categoryId: p.categoryId || 'cat-food',
    brand: p.brand || 'Unknown',
    images: Array.isArray(p.images) ? p.images : [],
    rating: typeof p.rating === 'number' ? p.rating : 0,
    reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
    inStock: typeof p.inStock === 'boolean' ? p.inStock : true,
    stockQuantity: typeof p.stockQuantity === 'number' ? p.stockQuantity : 100,
    // Дополнительные поля можно добавить по необходимости
    petType: p.petType || 'all',
    ageGroup: p.ageGroup || 'all',
  }));

  // Обновляем данные в памяти
  productsData = importedProducts;

  // В dev-режиме пробуем обновить файл (для удобства тестирования)
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    await fs.writeFile(filePath, JSON.stringify(importedProducts, null, 2), 'utf-8');
    console.log('Successfully updated products.json');
  } catch (error) {
    console.error('Failed to write products.json', error);
    // Не падаем с ошибкой, так как в продакшене запись в файл может быть запрещена
  }

  return importedProducts.length;
};
