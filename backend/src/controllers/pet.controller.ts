/**
 * Контроллер для работы с профилями питомцев
 * Обрабатывает HTTP запросы для CRUD операций над питомцами
 */

import { Request, Response } from 'express';
import * as petService from '../services/pet.service';
import type { Pet } from '../types';

/**
 * Получить список питомцев текущего пользователя
 * GET /api/pets
 */
export const getPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId || 'mock-user-id';
    const pets = petService.getPetsByUserId(userId);
    res.json(pets);
  } catch (error) {
    console.error('Error in getPets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить питомца по ID
 * GET /api/pets/:id
 */
export const getPetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId || 'mock-user-id';
    const pet = petService.getPetById(id, userId);

    if (!pet) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }

    res.json(pet);
  } catch (error) {
    console.error('Error in getPetById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Создать нового питомца
 * POST /api/pets
 */
export const createPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId || 'mock-user-id';
    const petData = req.body;

    // Валидация обязательных полей
    if (!petData.name || !petData.petType || !petData.weight || !petData.gender) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const newPet = petService.createPet(userId, petData);
    res.status(201).json(newPet);
  } catch (error) {
    console.error('Error in createPet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Обновить информацию о питомце
 * PUT /api/pets/:id
 */
export const updatePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId || 'mock-user-id';
    const petData = req.body;

    const updatedPet = petService.updatePet(id, userId, petData);

    if (!updatedPet) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }

    res.json(updatedPet);
  } catch (error) {
    console.error('Error in updatePet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Удалить питомца
 * DELETE /api/pets/:id
 */
export const deletePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId || 'mock-user-id';

    const deleted = petService.deletePet(id, userId);

    if (!deleted) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error in deletePet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Получить список пород
 * GET /api/pets/breeds
 */
export const getBreeds = async (req: Request, res: Response): Promise<void> => {
  try {
    const petType = req.query.petType as string;
    const breeds = petService.getBreeds(petType);
    res.json(breeds);
  } catch (error) {
    console.error('Error in getBreeds:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


