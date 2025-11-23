/**
 * Контроллер для мок-оплаты
 * Имитирует работу с платежными системами ЯндексСплит и СБП
 */

import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

/**
 * Инициировать оплату через ЯндексСплит (мок)
 * POST /api/payment/yandex-split
 */
export const payWithYandexSplit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      res.status(400).json({ error: 'Missing orderId or amount' });
      return;
    }

    // Имитация задержки API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Мок успешной оплаты
    const paymentResult = {
      success: true,
      paymentId: `yandex-split-${Date.now()}`,
      orderId,
      amount,
      method: 'yandex-split',
      status: 'completed',
      timestamp: new Date().toISOString(),
    };

    // Обновляем статус заказа
    orderService.updateOrderStatus(orderId, {
      paymentStatus: 'completed',
      orderStatus: 'processing',
    });

    res.json(paymentResult);
  } catch (error) {
    console.error('Error in payWithYandexSplit:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};

/**
 * Инициировать оплату через СБП (мок)
 * POST /api/payment/sbp
 */
export const payWithSBP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      res.status(400).json({ error: 'Missing orderId or amount' });
      return;
    }

    // Имитация задержки API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Мок успешной оплаты
    const paymentResult = {
      success: true,
      paymentId: `sbp-${Date.now()}`,
      orderId,
      amount,
      method: 'sbp',
      status: 'completed',
      qrCode: 'https://placehold.co/300x300/FF9800/FFFFFF?text=SBP+QR+Code',
      timestamp: new Date().toISOString(),
    };

    // Обновляем статус заказа
    orderService.updateOrderStatus(orderId, {
      paymentStatus: 'completed',
      orderStatus: 'processing',
    });

    res.json(paymentResult);
  } catch (error) {
    console.error('Error in payWithSBP:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};

/**
 * Инициировать оплату картой (мок)
 * POST /api/payment/card
 */
export const payWithCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount, cardNumber } = req.body;

    if (!orderId || !amount) {
      res.status(400).json({ error: 'Missing orderId or amount' });
      return;
    }

    // Имитация задержки API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Мок успешной оплаты
    const paymentResult = {
      success: true,
      paymentId: `card-${Date.now()}`,
      orderId,
      amount,
      method: 'card',
      status: 'completed',
      maskedCard: cardNumber ? `****${cardNumber.slice(-4)}` : '****1234',
      timestamp: new Date().toISOString(),
    };

    // Обновляем статус заказа
    orderService.updateOrderStatus(orderId, {
      paymentStatus: 'completed',
      orderStatus: 'processing',
    });

    res.json(paymentResult);
  } catch (error) {
    console.error('Error in payWithCard:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};


