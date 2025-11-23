/**
 * Сервис для работы с профилями питомцев
 * Использует временное хранилище в памяти для моковых данных
 */

import breedsData from '../data/breeds.json';
import type { Pet, Breed } from '../types';

// Временное хранилище питомцев в памяти (в реальном приложении была бы база данных)
let pets: Pet[] = [
  {
    id: 'pet-123456',
    userId: 'mock-user-id',
    name: 'Бобик',
    petType: 'dog',
    birthDate: '2020-01-01',
    weight: 12.5,
    gender: 'male',
    allergies: ['Курица'],
    isNeutered: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet-789012',
    userId: 'mock-user-id',
    name: 'Мурка',
    petType: 'cat',
    birthDate: '2022-05-15',
    weight: 4.2,
    gender: 'female',
    allergies: [],
    isNeutered: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

/**
 * Получить питомцев по ID пользователя
 */
export const getPetsByUserId = (userId: string): Pet[] => {
  return pets.filter((pet) => pet.userId === userId);
};

/**
 * Получить питомца по ID (с проверкой принадлежности пользователю)
 */
export const getPetById = (id: string, userId: string): Pet | undefined => {
  return pets.find((pet) => pet.id === id && pet.userId === userId);
};

/**
 * Создать нового питомца
 */
export const createPet = (
  userId: string,
  petData: Omit<Pet, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Pet => {
  const newPet: Pet = {
    id: `pet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    userId,
    ...petData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  pets.push(newPet);
  return newPet;
};

/**
 * Обновить информацию о питомце
 */
export const updatePet = (
  id: string,
  userId: string,
  petData: Partial<Pet>
): Pet | undefined => {
  const petIndex = pets.findIndex((pet) => pet.id === id && pet.userId === userId);

  if (petIndex === -1) {
    return undefined;
  }

  pets[petIndex] = {
    ...pets[petIndex]!,
    ...petData,
    id: pets[petIndex]!.id, // Не даем менять ID
    userId: pets[petIndex]!.userId, // Не даем менять userId
    createdAt: pets[petIndex]!.createdAt, // Не даем менять createdAt
    updatedAt: new Date().toISOString(),
  };

  return pets[petIndex];
};

/**
 * Удалить питомца
 */
export const deletePet = (id: string, userId: string): boolean => {
  const petIndex = pets.findIndex((pet) => pet.id === id && pet.userId === userId);

  if (petIndex === -1) {
    return false;
  }

  pets.splice(petIndex, 1);
  return true;
};

/**
 * Получить список пород
 */
export const getBreeds = (petType?: string): Breed[] => {
  if (!petType) {
    return breedsData as Breed[];
  }

  return breedsData.filter((breed) => breed.petType === petType || breed.petType === 'other') as Breed[];
};

/**
 * Получить породу по ID
 */
export const getBreedById = (id: string): Breed | undefined => {
  return breedsData.find((breed) => breed.id === id) as Breed | undefined;
};

