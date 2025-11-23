/**
 * Контроллер для работы с заказами
 * Обрабатывает создание и получение заказов
 */

import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

/**
 * Создать новый заказ
 * POST /api/orders
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId || 'mock-user-id';
    const orderData = req.body;

    // Валидация
    if (!orderData.items || orderData.items.length === 0) {
      res.status(400).json({ error: 'Order must contain at least one item' });
      return;
    }

    const newOrder = orderService.createOrder(orderData, userId);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить заказ по ID
 * GET /api/orders/:id
 */
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId || 'mock-user-id';

    const order = orderService.getOrderById(id, userId);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('Error in getOrderById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить все заказы пользователя
 * GET /api/orders
 */
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId || 'mock-user-id';
    const orders = orderService.getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error in getUserOrders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


