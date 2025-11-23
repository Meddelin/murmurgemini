// Базовые типы данных для Pet Shop Backend

/**
 * Категория товара
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

/**
 * Товар в магазине
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  weight?: number; // в граммах
  volume?: number; // в мл
  ageGroup?: 'puppy' | 'adult' | 'senior' | 'all'; // для какого возраста
  petType?: 'dog' | 'cat' | 'bird' | 'fish' | 'rodent' | 'all'; // для какого типа питомца
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'; // размер товара
  allergens?: string[]; // список аллергенов в составе
  specialFeatures?: string[]; // особенности (гипоаллергенный, органический и т.д.)
}

/**
 * Порода животного
 */
export interface Breed {
  id: string;
  name: string;
  petType: 'dog' | 'cat' | 'other';
  averageWeight: { min: number; max: number }; // в кг
  size: 'xs' | 's' | 'm' | 'l' | 'xl';
  commonAllergies?: string[];
  characteristics?: string[];
}

/**
 * Профиль питомца
 */
export interface Pet {
  id: string;
  userId: string;
  name: string;
  petType: 'dog' | 'cat' | 'bird' | 'fish' | 'rodent' | 'other';
  breedId?: string;
  birthDate: string;
  weight: number; // в кг
  gender: 'male' | 'female';
  allergies: string[];
  photo?: string;
  specialNotes?: string;
  isNeutered?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Пользователь
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

/**
 * Элемент корзины
 */
export interface CartItem {
  productId: string;
  quantity: number;
  petId?: string; // для какого питомца предназначен товар
}

/**
 * Заказ
 */
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryMethod: 'courier' | 'pickup' | 'post';
  deliveryAddress?: {
    street: string;
    city: string;
    postalCode: string;
    apartment?: string;
  };
  paymentMethod: 'card' | 'yandex-split' | 'sbp';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  syncedWith1C: boolean;
  sync1CNumber?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Элемент заказа
 */
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  petId?: string;
}

/**
 * Рекомендация товара
 */
export interface ProductRecommendation {
  product: Product;
  score: number; // оценка релевантности от 0 до 100
  reasons: string[]; // причины рекомендации
}

/**
 * Запрос с фильтрами для товаров
 */
export interface ProductFilterQuery {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  petType?: string;
  ageGroup?: string;
  minRating?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price' | 'rating' | 'popularity' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Ответ со списком товаров и пагинацией
 */
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


