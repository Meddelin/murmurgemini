/**
 * Сервис для работы с заказами
 * Управляет созданием и хранением заказов в памяти
 */

import type { Order } from '../types';

// Временное хранилище заказов в памяти
let orders: Order[] = [];

/**
 * Создать новый заказ
 */
export const createOrder = (orderData: Partial<Order>, userId: string): Order => {
  const newOrder: Order = {
    id: `order-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    userId,
    items: orderData.items || [],
    totalAmount: orderData.totalAmount || 0,
    deliveryMethod: orderData.deliveryMethod || 'courier',
    deliveryAddress: orderData.deliveryAddress,
    paymentMethod: orderData.paymentMethod || 'card',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    syncedWith1C: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  return newOrder;
};

/**
 * Получить заказ по ID
 */
export const getOrderById = (id: string, userId: string): Order | undefined => {
  return orders.find((order) => order.id === id && order.userId === userId);
};

/**
 * Получить все заказы пользователя
 */
export const getUserOrders = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};

/**
 * Обновить статус заказа
 */
export const updateOrderStatus = (
  id: string,
  status: Partial<Pick<Order, 'paymentStatus' | 'orderStatus' | 'syncedWith1C' | 'sync1CNumber'>>
): Order | undefined => {
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    return undefined;
  }

  orders[orderIndex] = {
    ...orders[orderIndex]!,
    ...status,
    updatedAt: new Date().toISOString(),
  };

  return orders[orderIndex];
};


