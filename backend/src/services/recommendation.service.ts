/**
 * Сервис рекомендательной системы
 * Подбирает товары на основе характеристик питомца:
 * - Вес → размер порций корма, размер одежды/лежанок
 * - Возраст → корм для щенков/взрослых/пожилых, игрушки по активности
 * - Порода → специализированный корм, размер аксессуаров
 * - Аллергии → исключение аллергенных ингредиентов
 * - Пол → специфичные товары (например, корм для кастрированных)
 */

import productsData from '../data/products.json';
import * as petService from './pet.service';
import type { Pet, Product, ProductRecommendation, Breed } from '../types';

/**
 * Получить рекомендации товаров для питомца
 */
export const getRecommendationsForPet = (petId: string, userId: string): ProductRecommendation[] => {
  // Получаем информацию о питомце
  const pet = petService.getPetById(petId, userId);
  if (!pet) {
    return [];
  }

  // Получаем породу, если указана
  let breed: Breed | undefined;
  if (pet.breedId) {
    breed = petService.getBreedById(pet.breedId);
  }

  // Вычисляем рекомендации для каждого товара
  const recommendations: ProductRecommendation[] = [];

  for (const product of productsData) {
    const score = calculateRecommendationScore(product as Product, pet, breed);
    
    if (score.totalScore > 0) {
      recommendations.push({
        product: product as Product,
        score: score.totalScore,
        reasons: score.reasons,
      });
    }
  }

  // Сортируем по убыванию оценки и возвращаем топ-20
  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, 20);
};

/**
 * Вычислить оценку рекомендации товара для питомца
 */
function calculateRecommendationScore(
  product: Product,
  pet: Pet,
  breed?: Breed
): { totalScore: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Проверка на соответствие типу питомца (критически важно)
  if (product.petType && product.petType !== 'all' && product.petType !== pet.petType) {
    return { totalScore: 0, reasons: [] }; // Товар не подходит
  }

  // Базовая оценка за соответствие типу питомца
  if (product.petType === pet.petType) {
    score += 30;
    reasons.push(`Для ${pet.petType === 'dog' ? 'собак' : 'кошек'}`);
  } else if (product.petType === 'all') {
    score += 15;
    reasons.push('Универсальный товар');
  }

  // 2. Проверка аллергий (критически важно)
  if (pet.allergies.length > 0 && product.allergens) {
    const hasAllergen = product.allergens.some((allergen) =>
      pet.allergies.some((petAllergy) => 
        allergen.toLowerCase().includes(petAllergy.toLowerCase()) ||
        petAllergy.toLowerCase().includes(allergen.toLowerCase())
      )
    );

    if (hasAllergen) {
      return { totalScore: 0, reasons: [] }; // Товар содержит аллергены
    }
  }

  // Бонус за гипоаллергенность, если у питомца есть аллергии
  if (pet.allergies.length > 0 && product.specialFeatures?.includes('гипоаллергенный')) {
    score += 25;
    reasons.push('Гипоаллергенный продукт');
  }

  // 3. Возрастная группа
  const petAgeInYears = calculateAge(pet.birthDate);
  const ageGroup = determineAgeGroup(petAgeInYears, pet.petType);

  if (product.ageGroup === ageGroup) {
    score += 20;
    reasons.push(`Для ${ageGroupToRussian(ageGroup)}`);
  } else if (product.ageGroup === 'all') {
    score += 5;
  }

  // 4. Размер на основе веса питомца
  const petSize = determineSizeByWeight(pet.weight, pet.petType);
  
  if (product.size === petSize) {
    score += 15;
    reasons.push(`Подходящий размер (${sizeToRussian(petSize)})`);
  } else if (product.size && Math.abs(sizeToNumber(product.size) - sizeToNumber(petSize)) === 1) {
    score += 5; // Близкий размер
  }

  // 5. Учет породы
  if (breed && breed.commonAllergies) {
    // Если в продукте нет общих для породы аллергенов - бонус
    const hasBreedAllergen = product.allergens?.some((allergen) =>
      breed.commonAllergies?.some((breedAllergy) =>
        allergen.toLowerCase().includes(breedAllergy.toLowerCase())
      )
    );

    if (!hasBreedAllergen && product.allergens) {
      score += 10;
      reasons.push('Подходит для породы');
    }
  }

  // 6. Для стерилизованных питомцев
  if (pet.isNeutered && product.specialFeatures?.includes('для стерилизованных')) {
    score += 20;
    reasons.push('Для стерилизованных питомцев');
  }

  // 7. Рейтинг и популярность товара (небольшой вес)
  score += product.rating * 2;
  score += Math.min(product.reviewCount / 50, 10); // Максимум 10 баллов за отзывы

  if (product.rating >= 4.7) {
    reasons.push('Высокий рейтинг');
  }

  // 8. Наличие товара
  if (product.inStock) {
    score += 5;
  } else {
    score -= 10; // Штраф за отсутствие
  }

  return { totalScore: Math.round(score), reasons };
}

/**
 * Вычислить возраст питомца в годах
 */
function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  const ageInMs = now.getTime() - birth.getTime();
  return ageInMs / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Определить возрастную группу
 */
function determineAgeGroup(ageInYears: number, petType: string): 'puppy' | 'adult' | 'senior' {
  if (petType === 'dog') {
    if (ageInYears < 1) return 'puppy';
    if (ageInYears >= 7) return 'senior';
    return 'adult';
  } else if (petType === 'cat') {
    if (ageInYears < 1) return 'puppy'; // Используем 'puppy' для котят тоже
    if (ageInYears >= 7) return 'senior';
    return 'adult';
  }
  return 'adult';
}

/**
 * Определить размер по весу
 */
function determineSizeByWeight(weight: number, petType: string): 'xs' | 's' | 'm' | 'l' | 'xl' {
  if (petType === 'dog') {
    if (weight < 5) return 'xs';
    if (weight < 10) return 's';
    if (weight < 25) return 'm';
    if (weight < 40) return 'l';
    return 'xl';
  } else if (petType === 'cat') {
    if (weight < 3) return 'xs';
    if (weight < 4.5) return 's';
    if (weight < 6) return 'm';
    if (weight < 8) return 'l';
    return 'xl';
  }
  return 'm';
}

/**
 * Преобразовать размер в число для сравнения
 */
function sizeToNumber(size: string): number {
  const sizes = { xs: 1, s: 2, m: 3, l: 4, xl: 5 };
  return sizes[size as keyof typeof sizes] || 3;
}

/**
 * Преобразовать возрастную группу в русский текст
 */
function ageGroupToRussian(ageGroup: string): string {
  const translations: Record<string, string> = {
    puppy: 'щенков/котят',
    adult: 'взрослых',
    senior: 'пожилых',
    all: 'всех возрастов',
  };
  return translations[ageGroup] || ageGroup;
}

/**
 * Преобразовать размер в русский текст
 */
function sizeToRussian(size: string): string {
  const translations: Record<string, string> = {
    xs: 'очень маленький',
    s: 'маленький',
    m: 'средний',
    l: 'большой',
    xl: 'очень большой',
  };
  return translations[size] || size;
}


